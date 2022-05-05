const baseUrl = "http://localhost:3000/api/v1"

export const Shift = {
    all(){
        return fetch(`${baseUrl}/shifts`).then(res => res.json())
    },
    show(id){
        return fetch(`${baseUrl}/shifts/${id}`).then(res => res.json())
    },
    create(params){
        return fetch(`${baseUrl}/shifts`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params),
            credentials: "include"
        }).then(res => res.json())
    },
    employees(id){
        return fetch(`${baseUrl}/shifts/${id}/employees`).then(res => res.json()) 
    },
    addContainer(id,params){
        return fetch(`${baseUrl}/shifts/${id}/add_containers`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params),
            credentials: "include"
        }).then(res => res.json())
    },
    addEmployee(id,params){
        return fetch(`${baseUrl}/shifts/${id}/add_employees`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params),
            credentials: "include"
        }).then(res => res.json())
    },
    removeContainer(id,params){
        return fetch(`${baseUrl}/shifts/${id}/remove_containers`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params),
            credentials: "include"
        }).then(res => res.json())
    },
    removeEmployee(id,params){
        return fetch(`${baseUrl}/shifts/${id}/remove_employees`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params),
            credentials: "include"
        }).then(res => res.json())
    },
    finalize(id, params){
        return fetch(`${baseUrl}/shifts/${id}/finalize`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params),
            credentials: "include"
        }).then(res => res.json())
    }
}
export const Container = {
    all(){
        return fetch(`${baseUrl}/containers`).then(res => res.json())
    },
    due(){
        return fetch(`${baseUrl}/containers/due`).then(res => res.json())        
    },
    addEmployee(id,params){
        return fetch(`${baseUrl}/containers/${id}/add_employees`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params),
            credentials: "include"
        }).then(res => res.json())
    },
    start_container(id){
        return fetch(`${baseUrl}/containers/${id}/start_container`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(res => res.json())
    },
    finish_container(id){
        return fetch(`${baseUrl}/containers/${id}/finish_container`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(res => res.json())
    }
}

export const Employee = {
    current_supervisor(){
        return fetch(`${baseUrl}/employees/current`, {
            credentials: "include"
        }).then(res => {
            return res.json()
        })
    },
    all(){
        return fetch(`${baseUrl}/employees`).then(res => res.json())
    },
    show(id){
        return fetch(`${baseUrl}/employees/${id}`).then(res => res.json())
    },
    signed_out(){
        return fetch(`${baseUrl}/employees/signed_out`).then(res => res.json())        
    },
    update_rating(id, params){
        return fetch(`${baseUrl}/employees/${id}/update_rating`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params),
            credentials: "include"
        }).then(res => res.json())
    }
}

export const Session = {
    create(params) {
        return fetch(`${baseUrl}/session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params),
            credentials: "include"
        }).then(res => {
            return res.json()
        })
    },
    destroy(){
        return fetch(`${baseUrl}/session`,{
            method: "DELETE",
            credentials: "include"
        }).then(res => {
            res.json()
        })
    }
}