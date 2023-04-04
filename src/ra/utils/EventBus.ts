type EventBusCallback = (...args: any[]) => void;
type P = {
    [key: string]: EventBusCallback[];
};
const EventInstance: P = {};

const EventBus = {
    subscribe: (event: string, callback: EventBusCallback) => {
        if (!EventInstance.hasOwnProperty(event)) {
            EventInstance[event] = [];
        }
        EventInstance[event].push(callback);
    },
    unsubscribe: (event: string, callback: EventBusCallback) => {
        if (!EventInstance.hasOwnProperty(event)) {
            return;
        }
        EventInstance[event].splice(EventInstance[event].indexOf(callback), 1);
    },
    post: (event: string, ...args: any[]) => {
        if (!EventInstance.hasOwnProperty(event)) {
            return;
        }
        EventInstance[event].forEach(callback => {
            callback(...args);
        })
    }

}

export default EventBus;
