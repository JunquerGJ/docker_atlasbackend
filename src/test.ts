import { PrismaClient } from "@prisma/client"
import * as fs from 'fs';
import * as crypto from 'crypto';

const prisma = new PrismaClient()

async function main() {
    await createPerms()
    await createProfiles()
    await createUser()
}






async function createPermission(permission: String, entityName: String) {
    const perm = await prisma.permission.create({
        data: {
            name: permission + " " + entityName
        }
    })
    return perm;
}
async function createPerms() {
    let results = await Promise.all([
        createPermission('CREATE', 'Area'),
        createPermission('READ', 'Area'),
        createPermission('UPDATE', 'Area'),
        createPermission('DELETE', 'Area'),
        createPermission('CREATE', 'Asset'),
        createPermission('READ', 'Asset'),
        createPermission('UPDATE', 'Asset'),
        createPermission('DELETE', 'Asset'),
        createPermission('CREATE', 'Audit'),
        createPermission('READ', 'Audit'),
        createPermission('UPDATE', 'Audit'),
        createPermission('DELETE', 'Audit'),
        createPermission('CREATE', 'Vulnerability'),
        createPermission('READ', 'Vulnerability'),
        createPermission('UPDATE', 'Vulnerability'),
        createPermission('DELETE', 'Vulnerability'),
        createPermission('CREATE', 'Evidence'),
        createPermission('READ', 'Evidence'),
        createPermission('UPDATE', 'Evidence'),
        createPermission('DELETE', 'Evidence'),
        createPermission('CREATE', 'Server'),
        createPermission('READ', 'Server'),
        createPermission('UPDATE', 'Server'),
        createPermission('DELETE', 'Server'),
        createPermission('CREATE', 'IP'),
        createPermission('READ', 'IP'),
        createPermission('UPDATE', 'IP'),
        createPermission('DELETE', 'IP'),
        createPermission('CREATE', 'Network'),
        createPermission('READ', 'Network'),
        createPermission('UPDATE', 'Network'),
        createPermission('DELETE', 'Network'),
        createPermission('CREATE', 'Contact'),
        createPermission('READ', 'Contact'),
        createPermission('UPDATE', 'Contact'),
        createPermission('DELETE', 'Contact'),
        createPermission('CREATE', 'CWE'),
        createPermission('READ', 'CWE'),
        createPermission('UPDATE', 'CWE'),
        createPermission('DELETE', 'CWE'),
        createPermission('CREATE', 'Profile'),
        createPermission('READ', 'Profile'),
        createPermission('UPDATE', 'Profile'),
        createPermission('DELETE', 'Profile'),
        createPermission('CREATE', 'Domain'),
        createPermission('READ', 'Domain'),
        createPermission('UPDATE', 'Domain'),
        createPermission('DELETE', 'Domain'),
        createPermission('CREATE', 'Certificate'),
        createPermission('READ', 'Certificate'),
        createPermission('UPDATE', 'Certificate'),
        createPermission('DELETE', 'Certificate'),
        createPermission('CREATE', 'User'),
        createPermission('READ', 'User'),
        createPermission('UPDATE', 'User'),
        createPermission('DELETE', 'User'),
        createPermission('CREATE', 'Characteristic'),
        createPermission('READ', 'Characteristic'),
        createPermission('UPDATE', 'Characteristic'),
        createPermission('DELETE', 'Characteristic'),
        createPermission('READ', 'Permission'),
        createPermission('UPDATE', 'Permission'),
        createPermission('DELETE', 'Permission'),
        createPermission('CREATE', 'Permission'),
        createPermission('CREATE', 'Waf'),
        createPermission('READ', 'Waf'),
        createPermission('UPDATE', 'Waf'),
        createPermission('DELETE', 'Waf'),
        createPermission('CREATE', 'Ids'),
        createPermission('READ', 'Ids'),
        createPermission('UPDATE', 'Ids'),
        createPermission('DELETE', 'Ids')
    ])
    return (results)
}
async function createProfiles() {
    const profileAdmin = await prisma.profile.create({
        data: {
            name: "admin",
            permissions: {
                connect: [
                    { name: "CREATE User" },
                    { name: "READ User" },
                    { name: "UPDATE User" },
                    { name: "DELETE User" },

                    { name: "CREATE Permission" },
                    { name: "READ Permission" },
                    { name: "UPDATE Permission" },
                    { name: "DELETE Permission" },

                    { name: "CREATE Profile" },
                    { name: "READ Profile" },
                    { name: "UPDATE Profile" },
                    { name: "DELETE Profile" },
                ]
            }
        }
    })
    return (profileAdmin)
}
async function createUser() {
    let PW_ALGORITHM = fs.readFileSync('/run/secrets/PW_ALGORITHM')
    let PW_KEYGENERATOR = fs.readFileSync('/run/secrets/PW_KEYGENERATOR')
    const algorithm = PW_ALGORITHM
    const keygen = PW_KEYGENERATOR
    console.log("Algoritm","")
    console.log("keygen",keygen)
    const key = crypto.scryptSync(keygen, 'salt', 24);
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv("aes-192-cbc", key, iv);

    let hash = cipher.update("admin", 'utf8', 'hex');
    hash += cipher.final('hex');
    const user = await prisma.user.create({
        data: {
            name: "admin",
            hash: hash,
            profile: {
                connect: {
                    id: 1
                }
            }
        }
    })
}


main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
