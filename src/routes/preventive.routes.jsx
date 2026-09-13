import { PagesContainer, Screen } from "../contexts/PagesContext";
import { PreventivePlan } from "../pages/week-calendar";
import { WeekCalendar } from "../pages/week-calendar/WeekCalendar";
import { ServiceOrders } from "../pages/week-calendar/ServiceOrders";
import { ExecuteServiceOrderForm } from "../pages/week-calendar/ExecuteServiceOrderForm";
import { PreventiveActions } from "../pages/preventive-actions/PreventiveActions";
import { PreventiveActionForm } from "../pages/preventive-actions/PreventiveActionForm";

export function PreventiveRoutes() {
  return (
    <PagesContainer className="w-[100%] h-tabPage flex items-center justify-center">
      <Screen name="Preventive.Plan" component={PreventivePlan} />

      <Screen name="Preventive.Actions" component={PreventiveActions} />
    </PagesContainer>
  );
}

export function PreventiveOsRoutes() {
  return (
    <PagesContainer className="w-[100%] h-tabPage flex items-center justify-center">
      <Screen name="Preventive.Plan.Calendar" component={WeekCalendar} />

      <Screen
        name="Preventive.Plan.Calendar.ServiceOrders"
        component={ServiceOrders}
      />
    </PagesContainer>
  );
}

export function PreventiveOsModalRoutes() {
  return (
    <PagesContainer>
      <Screen
        name="Preventive.Plan.Calendar.ServiceOrders"
        component={() => <></>}
      />
      <Screen
        name="Preventive.Plan.Calendar.ServiceOrders.Execute"
        component={ExecuteServiceOrderForm}
      />
    </PagesContainer>
  );
}

export function PreventiveActionsFormRoutes({ onBack }) {
  return (
    <PagesContainer>
      <Screen
        name="Preventive.Actions"
        component={() => {
          <></>;
        }}
      />
      <Screen
        name="Preventive.Actions.NewActions"
        component={(props) => (
          <PreventiveActionForm {...props} onBack={onBack} />
        )}
      />
      <Screen
        name="Preventive.Actions.EditActions"
        component={(props) => (
          <PreventiveActionForm {...props} onBack={onBack} />
        )}
      />
    </PagesContainer>
  );
}
