import { PagesContainer, Screen } from "../contexts/PagesContext";

import { PreventiveHistoric } from "../pages/preventive/PreventiveHistoric";
import { PreventiveOpened } from "../pages/preventive/PreventiveOpened";
import { PreventiveActions } from "../pages/preventive/PreventiveActions";
import { RegisterPreventive } from "../pages/preventive/RegisterPreventive";
import { PreventiveActionForm } from "../pages/preventive/PreventiveActionForm";

export function PreventiveRoutes() {
  return (
    <PagesContainer className="w-[100%] h-tabPage flex items-center justify-center">

      <Screen 
        name="Preventive.Historic" 
        component={PreventiveHistoric} 
      />

      <Screen 
        name="Preventive.Opened" 
        component={PreventiveOpened} 
      />

      <Screen 
        name="Preventive.Actions" 
        component={PreventiveActions} 
      />

      <Screen
        name="Preventive.RegisterPreventive"
        component={RegisterPreventive}
      />

    </PagesContainer>
  );
}

export function PreventiveActionsFormRoutes() {
  return (
    <PagesContainer>
      <Screen
        name="Preventive.Actions"
        component={()=>(<></>)}
      />
      <Screen
        name="Preventive.Actions.NewActions"
        component={PreventiveActionForm}
      />
      <Screen
        name="Preventive.Actions.EditActions"
        component={PreventiveActionForm}
      />
    </PagesContainer>
  );
}
