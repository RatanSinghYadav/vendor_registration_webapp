import { jwtDecode } from "jwt-decode";


const CheckUserRole = () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("token is not found!");
        }

        const decode = jwtDecode(token);

        return decode.role;
    } catch (error) {
        console.error("user role is not authenticated!", error);
    }
}

export default CheckUserRole;