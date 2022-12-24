interface DialogProps {
    title: string;
    message: string;
    callback: (condition:boolean) => void;
}