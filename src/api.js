import * as Entity from './entity'
import axios, { AxiosError } from 'axios'

/**
 * This should be used as :
 * import * as API from '...path/to/api'
 *          ...
 * // example of use
 * const connection_id = await API.User.connect(...)
 * console.log(connection_id)
 *          ...
 * const matching_documents = await API.Document.search(...)
 * console.log(matching_documents.length)
 * 
 */

const server_address = 'https://recycle-hub-backend.onrender.com'
// const server_address = 'http://localhost:3000'

const routes = {
    iam : {
        connect : '/iam/login',
        verify: '/iam/validate',
    },
    user : {
        read: '/user/read',
        update: '/user/update',
        requests: '/user/requests',
        proposals: '/user/proposals',
        notifications: {      
            read: '/user/notifications',
            asRead: '/user/readnotification',
        }
    },
    categories: {
        read: '/categories'
    },
    document: {
        read: '/document/read',
        content: '/document/content',
        search: '/document/search'
    },
    proposal : {
        create : '/proposal/create'
    },
    request : {
        create : '/request/create',
        read: '/request/read',
        search: '/request/search',
        update: '/request/update',
        delete: '/request/delete'
    }
}
async function customFetch(method, url, data) {
    // console.log('Sending ', data)
    try{
        const response = await axios({
            baseURL: server_address,
            data,
            headers: {
                "Content-Type": data instanceof FormData ? "multipart/form-data" : undefined,
                "hasAuthorization": authorization ? true : undefined,
                "Authorization": authorization ? authorization : undefined
            },
            method,
            params: method == 'GET' ? data : undefined,
            url
        })
        return response.data.data
    }
    catch(error) {
        console.log(error.response.data.error)
        throw new Error(error.response.data.error)
    }
}

export const IAM = {
    async connect(phone = '', mail = '') {
        return Entity.Connection.fromObject(await customFetch('POST', routes.iam.connect, {phone, mail}))
    },
    async verify(connection = (new Entity.Connection).toObject()) {
        return Entity.User.fromObject(await customFetch('POST', routes.iam.verify, connection))
    },
}

export const User = {
    async read(id = 0) {
        return Entity.User.fromObject(await customFetch('GET', routes.user.read, {id}))
    },
    async update(user = (new Entity.User).toObject()) {
        return Entity.User.fromObject(await customFetch('PUT', routes.user.update, user))
    },
    async readRequests(user = 0) {
        return [...await customFetch('GET', routes.user.requests, {id: user})].map(Entity.User.fromObject)
    },
    async readPropposals(user = 0) {
        return [...await customFetch('GET', routes.user.proposals, {id: user})].map(Entity.Proposal.fromObject)
    },
    async fetchNotifications(user = 0) {
        return [...await customFetch('GET', routes.user.notifications.read, {id : user})].map(Entity.Notification.fromObject)
    },
    async readNotification(notification = 0) {
        return Entity.Notification.fromObject(await customFetch('POST', routes.user.notifications.asRead, {id: notification}))
    }
}
export const Document = {
    async read(id = 0) {
        return Entity.Document.fromObject(await customFetch('GET', routes.document.read, {id}))
    },
    async content(id) {
        return await customFetch('GET', routes.document.content, {id})
    },
    async search(text = '', categories = []) {
        return [...await customFetch('GET', routes.document.search, {text, "categories": categories})].map(Entity.Document.fromObject)
    }
}
export const Categories = {
    async read() {
        return [...await customFetch('GET', routes.categories.read)].map(Entity.Category.fromObject)
    }
}
export const Proposal = {
    async create(user = 0, name = '', description = '', categories = [], files = []) {
        const proposal = {user, name, description}
        const form = new FormData()
        form.append('proposal', JSON.stringify(proposal))
        form.append('categories', JSON.stringify(categories))
        for(let f of params.files) form.append('files[]', f)
        const params = Entity.ProposalParams.fromObject(await customFetch('POST', routes.proposal.create, {proposal, categories, files}, true))
        return params.proposal
    }
}
export const Request = {
    async create(name = '', description = '', user = 0, unit = '', amount = 0, categories = []) {
        const request = {name, description, user, unit, amount}
        const params = Entity.RequestParams.fromObject(await customFetch('POST', routes.request.create, {request, categories}))
        return params.request
    },
    async read(id = 0) {
        return Entity.Request.fromObject(await customFetch('GET', routes.request.read, {id}))
    },
    async search(text = '', categories = []) {
        return [...await customFetch('GET', routes.request.search, {text, categories})].map(Entity.Request.fromObject)
    },
    async update(request = (new Entity.Request).toObject()) {
        return Entity.Request.fromObject(await customFetch('PUT', routes.request.update, request))
    },
    async delete(id = 0) {
        return Entity.Request.fromObject(await customFetch('DELETE', routes.request.delete, {id}))
    }
}

let authorization = null
export function setAuth(a) { authorization = a }