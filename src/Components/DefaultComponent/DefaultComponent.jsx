// import SideBar from '../SideBar/SideBar'
import { FooterComponent } from '../FooterComponent/FooterComponent'
import { HeaderComponent } from '../HeaderComponent/HeaderComponent'
import './DefaultComponent.scss'

export const DefaultComponent = ({ children }) => {

    return (
        <>
            <HeaderComponent />
            {children}
            <FooterComponent />
        </>
    )
}