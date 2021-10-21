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

    const getAllMembers = (sessionId) => {
        return axios({
            url: '/admin/user/member',
            method: 'get',
            headers: {
                JSESSIONID: sessionId
            }
        })
    }

    const insertMember = (sessionId, {address, birth, gender, phone, username, wxId, password}) => {
        return axios({
            url: '/admin/user/member',
            method: 'post',
            data: {
                    address,
                    birth,
                    gender,
                    phone,
                    username,
                    wxId,
                    password
            },
            headers: {
                JSESSIONID: sessionId
            }
        })
    }

    const updateMember = (sessionId, uid, {address, birth, gender, phone, username, wxId, password}) => {
        return axios({
            url: `/admin/user/member/${uid}`,
            method: 'post',
            data: {
                address,
                birth,
                gender,
                phone,
                username,
                wxId,
                password
            },
            headers: {
                JSESSIONID: sessionId
            }
        })
    }


    const deleteMember = (sessionId, uid) => {
        return axios({
            url: `/admin/user/member/${uid}`,
            method: 'delete',
            headers: {
                JSESSIONID: sessionId
            }
        })
    }

    const getBackgroundImages = () => {
        return axios({
            url: `/theme`,
            method: 'get',
        })
    }

    const getTasks = (sessionId, {status, uid}) => {
        return axios({
            url: `/task`,
            method: 'get',
            headers: {
                JSESSIONID: sessionId
            },
            params: {
                status,
                uid
            }
        })
    }

    const getTask = (sessionId, requestId) => {
        return axios({
            url: `/task/${requestId}`,
            method: 'get',
            headers: {
                JSESSIONID: sessionId
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
        getTask,
    }
}
