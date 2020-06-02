import { JsonWebTokenError } from "jsonwebtoken"



interface IncludeType {
    area?: boolean
    asset?: boolean
    assets?: boolean
    audit?: boolean
    audits?: boolean
    auditor?: boolean
    domain?: boolean
    characteristic?: boolean
    characteristics?: boolean
    contact?: boolean
    contacts?: boolean
    cwe?: boolean
    evidences?: boolean
    ip?: boolean
    ips?: boolean
    network?: boolean
    permissions?: boolean
    profile?: boolean
    profiles?: boolean
    responsable?: boolean
    server?: boolean
    servers?: boolean
    users?: boolean
    user?: boolean
    vulnerabilities?: boolean
}


function validateIncludes(permissions, reqInclude) {

    if (reqInclude.area) {
        if (!permissions.includes("READ Area")) {
            delete reqInclude.area
        }
    }

    if (reqInclude.asset) {
        if (!permissions.includes("READ Asset")) {
            delete reqInclude.asset
        }
    }
    if (reqInclude.assets) {
        if (!permissions.includes("READ Asset")) {
            delete reqInclude.assets
        }
    }
    if (reqInclude.audit) {
        if (!permissions.includes("READ Audit")) {
            delete reqInclude.audit
        }
    }
    if (reqInclude.audits) {
        if (!permissions.includes("READ Audit")) {
            delete reqInclude.audits
        }
    }
    if (reqInclude.auditor) {
        if (!permissions.includes("READ User")) {
            delete reqInclude.auditor
        }
    }
    if (reqInclude.user) {
        if (!permissions.includes("READ User")) {
            delete reqInclude.user
        }
    }
    if (reqInclude.users) {
        if (!permissions.includes("READ User")) {
            delete reqInclude.users
        }
    }
    if (reqInclude.domain) {
        if (!permissions.includes("READ Domain")) {
            delete reqInclude.domain
        }
    }
    if (reqInclude.characteristics) {
        if (!permissions.includes("READ Characteristic")) {
            delete reqInclude.characteristics
        }
    }
    if (reqInclude.contact) {
        if (!permissions.includes("READ Contact")) {
            delete reqInclude.contact
        }
    }
    if (reqInclude.contacts) {
        if (!permissions.includes("READ Contact")) {
            delete reqInclude.contacts
        }
    }
    if (reqInclude.responsable) {
        if (!permissions.includes("READ Contact")) {
            delete reqInclude.responsable
        }
    }
    if (reqInclude.cwe) {
        if (!permissions.includes("READ CWE")) {
            delete reqInclude.cwe
        }
    }
    if (reqInclude.evidences) {
        if (!permissions.includes("READ Evidence")) {
            delete reqInclude.evidences
        }
    }
    if (reqInclude.ip) {
        if (!permissions.includes("READ IP")) {
            delete reqInclude.ip
        }
    }
    if (reqInclude.ips) {
        if (!permissions.includes("READ IP")) {
            delete reqInclude.ips
        }
    }
    if (reqInclude.networks) {
        if (!permissions.includes("READ Network")) {
            delete reqInclude.network
        }
    }
    if (reqInclude.permissions) {
        if (!permissions.includes("READ Permission")) {
            delete reqInclude.permissions
        }
    }
    if (reqInclude.profile) {
        if (!permissions.includes("READ Profile")) {
            delete reqInclude.profile
        }
    }
    if (reqInclude.profiles) {
        if (!permissions.includes("READ Profile")) {
            delete reqInclude.profiles
        }
    }
    if (reqInclude.server) {
        if (!permissions.includes("READ Server")) {
            delete reqInclude.server
        }
    }
    if (reqInclude.servers) {
        if (!permissions.includes("READ Server")) {
            delete reqInclude.servers
        }
    }
    if (reqInclude.vulnerabilities) {
        if (!permissions.includes("READ Vulnerability")) {
            delete reqInclude.vulnerabilities
        }
    }


    return reqInclude;

}

function validateIncludes2(permissions, aux) {

    var reqInclude = JSON.parse(JSON.stringify(aux))

    if (reqInclude.area) {
        if (!permissions.includes("READ Area")) {
            delete reqInclude.area
        }else{
            reqInclude.area=true
        }
    }

    if (reqInclude.asset) {
        if (!permissions.includes("READ Asset")) {
            delete reqInclude.asset
        }else{
            reqInclude.asset=true
        }
    }
    if (reqInclude.assets) {
        if (!permissions.includes("READ Asset")) {
            delete reqInclude.assets
        }else{
            reqInclude.assets=true
        }
    }
    if (reqInclude.audit) {
        if (!permissions.includes("READ Audit")) {
            delete reqInclude.audit
        }else{
            reqInclude.audit=true
        }
    }
    if (reqInclude.audits) {
        if (!permissions.includes("READ Audit")) {
            delete reqInclude.audits
        }else{
            reqInclude.audits=true
        }
    }
    if (reqInclude.auditor) {
        if (!permissions.includes("READ User")) {
            delete reqInclude.auditor
        }else{
            reqInclude.auditor=true
        }
    }
    if (reqInclude.user) {
        if (!permissions.includes("READ User")) {
            delete reqInclude.user
        }else{
            reqInclude.user=true
        }
    }
    if (reqInclude.users) {
        if (!permissions.includes("READ User")) {
            delete reqInclude.users
        }else{
            reqInclude.users=true
        }
    }
    if (reqInclude.domain) {
        if (!permissions.includes("READ Domain")) {
            delete reqInclude.domain
        }else{
            reqInclude.domain=true
        }
    }
    if (reqInclude.characteristics) {
        if (!permissions.includes("READ Characteristic")) {
            delete reqInclude.characteristics
        }else{
            reqInclude.characteristics=true
        }
    }
    if (reqInclude.contact) {
        if (!permissions.includes("READ Contact")) {
            delete reqInclude.contact
        }else{
            reqInclude.contact=true
        }
    }
    if (reqInclude.contacts) {
        if (!permissions.includes("READ Contact")) {
            delete reqInclude.contacts
        }else{
            reqInclude.contacts= {
                select : {
                    functionality : true,
                    contact : true
                }
            }
        }
    }
    if (reqInclude.responsable) {
        if (!permissions.includes("READ Contact")) {
            delete reqInclude.responsable
        }else{
            reqInclude.responsable=true
        }
    }
    if (reqInclude.cwe) {
        if (!permissions.includes("READ CWE")) {
            delete reqInclude.cwe
        }else{
            reqInclude.cwe=true
        }
    }
    if (reqInclude.evidences) {
        if (!permissions.includes("READ Evidence")) {
            delete reqInclude.evidences
        }else{
            reqInclude.evidences=true
        }
    }
    if (reqInclude.ip) {
        if (!permissions.includes("READ IP")) {
            delete reqInclude.ip
        }else{
            reqInclude.ip=true
        }
    }
    if (reqInclude.ips) {
        if (!permissions.includes("READ IP")) {
            delete reqInclude.ips
        }else{
            reqInclude.ips=true
        }
    }
    if (reqInclude.network) {
        if (!permissions.includes("READ Network")) {
            delete reqInclude.network
        }else{
            reqInclude.network=true
        }
    }
    if (reqInclude.permissions) {
        //if (!permissions.includes("READ Permission")) {
        //    console.log("delete")
        //    delete reqInclude.permissions
        //}else{
        //    console.log("open")
            reqInclude.permissions=true
        //}
    }
    if (reqInclude.profile) {
        if (!permissions.includes("READ Profile")) {
            delete reqInclude.profile
        }else{
            reqInclude.profile=true
        }
    }
    if (reqInclude.profiles) {
        if (!permissions.includes("READ Profile")) {
            delete reqInclude.profiles
        }else{
            reqInclude.profiles=true
        }
    }
    if (reqInclude.server) {
        if (!permissions.includes("READ Server")) {
            delete reqInclude.server
        }else{
            if(reqInclude.ip && permissions.includes("READ IP")){
                reqInclude.server = {
                    ip : true
                }
            }else{
                reqInclude.server=true
            }
        }
    }
    if (reqInclude.servers) {
        if (!permissions.includes("READ Server")) {
            delete reqInclude.servers
        }else{
            reqInclude.servers=true
        }
    }
    if (reqInclude.vulnerabilities) {
        if (!permissions.includes("READ Vulnerability")) {
            delete reqInclude.vulnerabilities
        }else{
            reqInclude.vulnerabilities=true
        }
    }

    return reqInclude;

}

export  {
    validateIncludes,
    validateIncludes2
}