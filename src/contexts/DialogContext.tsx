import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  ReactComponentElement,
  JSXElementConstructor,
  useContext
} from "react";

import { DialogContainer } from "../components/containers/DialogContainer";
import { DialogAlert } from "../components/dialogs/DialogAlert";
import { DialogError } from "../components/dialogs/DialogError";
import { DialogQuestion } from "../components/dialogs/DialogQuestion";

type DialogsNames = keyof typeof DialogComponents

type DialogError = (title:string, message: string) => void
type DialogAlert = (title:string, message: string) => void
type DialogQuestion = (
  title: string,
  message: string,
  yes: () => void,
  no: () => void
) => void

export interface UseDialogProps {
  dialogError: DialogError;
  dialogAlert: DialogAlert;
  dialogQuestion: DialogQuestion;
}

interface DialogContextDataProps {
  visible: boolean;
  type: DialogsNames;
  title: string;
  message: string;
  callback: (condition:boolean)=>void;
  dialogError: DialogError;
  dialogAlert: DialogAlert;
  dialogQuestion: DialogQuestion;
}

interface DialogContextProviderProps {
  children: ReactNode;
}

export const DialogContext = createContext({} as DialogContextDataProps)

export function DialogContextProvider({ children }: DialogContextProviderProps) {

  const [title, setTitle] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<DialogsNames>('Alert')
  const [callback, setCallback] = useState<{func:(condition:boolean)=>void}>({func:(condition:boolean)=>{}})

  const dialogError:DialogError = (title, message) => {
    setTitle(title)
    setMessage(message)
    
    setCallback({func:(condition:boolean)=>{
      setVisible(false)
    }})

    setType('Error')
    setVisible(true)
  }

  const dialogAlert:DialogAlert = (title, message) => {
    setTitle(title)
    setMessage(message)

    setCallback({func:(condition:boolean)=>{
      setVisible(false)
    }})

    setType('Alert')
    setVisible(true)
  }

  const dialogQuestion:DialogQuestion = (title, message, yes, no ) => {
    setTitle(title)
    setMessage(message)

    setCallback({func:(condition:boolean)=>{
      condition?yes():no()
      setVisible(false)
    }})

    setType('Question')
    setVisible(true)
  }

  return (
    <DialogContext.Provider
      value={{
        visible,
        type,
        dialogError,
        dialogAlert,
        dialogQuestion,
        title,
        message,
        callback: callback.func,
      }}
    >
      {children}
    </DialogContext.Provider>
  )

}

export function Dialogs() {

  const { visible, type, message, title, callback } = useContext(DialogContext)

  const DialogConponent = DialogComponents[type]

  return (
    <>
      {visible &&
        <DialogContainer
          width={"300px"}
          height={"170px"}
        >
          <div
            className="
              w-full h-full p-3
              bg-gray-200 
              shadow-xl shadow-gray-700 
              rounded-xl
            "
          >
            <DialogConponent 
              message={message}
              title={title}
              callback={callback}
            />
          </div>
        </DialogContainer>
      }
    </>
  )
}

const DialogComponents = {
  Alert: DialogAlert,
  Error: DialogError,
  Question: DialogQuestion,
}
