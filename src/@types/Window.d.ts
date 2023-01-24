interface Window extends lib.TrustedTypesWindow {
    ipc: {
        on: <T>(event:import('../../@types/Routes').RenderRoutes, callback:(event:{returnValue:any}, args:T)=>void)=>this;
        send: <T>(event:keyof import('../../@types/Routes').MainRoutes, args?:this)=>this;
        sendSync: <T>(event:keyof import('../../@types/Routes').MainRoutes, args?:T)=>this;
    };
}