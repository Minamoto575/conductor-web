import axios from "axios";


export default function api() {
    const login = (username, password) => {
        return axios({
            url: '/admin/login',
            method: 'post',
            data: {
                username,
                password
            }
        })
    }

    const getAllMembers = (token) => {
        return axios({
            url: '/admin/user/member',
            method: 'get',
            headers: {
                Authorization: token
            }
        })
    }

    const insertMember = (token, {address, birth, gender, phone, username, wxId}) => {
        return axios({
            url: '/admin/user/member',
            method: 'post',
            data: {
                    address,
                    birth,
                    gender,
                    phone,
                    username,
                    wxId
            }
        })
    }

    const updateMember = (token, uid, {address, birth, gender, phone, username, wxId}) => {
        return axios({
            url: `/admin/user/member/${uid}`,
            method: 'post',
            data: {
                address,
                birth,
                gender,
                phone,
                username,
                wxId
            }
        })
    }


    const deleteMember = (token, uid) => {
        return axios({
            url: `/admin/user/member/${uid}`,
            method: 'delete',
            headers: {
                Authorization: token
            }
        })
    }

    const getBackgroundImages = () => {
        return axios({
            url: `/theme`,
            method: 'get',
        })
    }

    const getTasks = (token, {status, uid}) => {
        return axios({
            url: `/task`,
            method: 'get',
            headers: {
                Authorization: token
            },
            params: {
                status,
                uid
            }
        })
    }

    const getTask = (token, requestId) => {
        return axios({
            url: `/task/${requestId}`,
            method: 'get',
            headers: {
                Authorization: token
            }
        })
    }


    return {
        login,
        getAllMembers,
        insertMember,
        deleteMember,
        getBackgroundImages,
        updateMember,
        getTasks,
        getTask
    }
}
