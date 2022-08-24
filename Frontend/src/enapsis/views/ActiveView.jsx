import { NothingSelectedView } from "./NothingSelectedView"

export const ActiveView = () => {

    const active = 'home'

    if(active === 'home') {
        return <NothingSelectedView />
    }
}
