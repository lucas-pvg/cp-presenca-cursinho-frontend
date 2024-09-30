import { userMapper, userBasicInfoMapper } from "../../data/mapper/user.mapper";
import { UserServiceResponse, UserBasicInfoServiceResponse } from "../../data/models/user.model";
import { get, post } from "../axios";

const UserService = {
    async listUsers(params?: unknown) {
        const response = await get('user/', { params });
        const usersMapped = response.map((user: UserBasicInfoServiceResponse) => 
            userBasicInfoMapper(user)
        );
        
        return usersMapped;
    },

    async retrieveSelfUser(params?: unknown) {
        const response = await get('user/self/', { params });
        const usersMapped = response.map((user: UserServiceResponse) => userMapper(user));
        
        return usersMapped;
    },

    async registerUser(data: unknown) {
        return await post('user/', data);
    },

    async registerMultipleUsers(data: unknown) {
        return await post('register_multiple/', data);
    },

    async retrieveBasicInfoById(id: string, params?: unknown) {
        const response = await get(`user/${id}/`, { params });
        return userBasicInfoMapper(response);
    }
}

export default UserService;