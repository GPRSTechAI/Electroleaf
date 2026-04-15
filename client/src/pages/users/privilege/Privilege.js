import React, { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { Stack, Grid, Button } from "@mui/material";

import permissionsList from "src/assets/data/previleges";

import PrivilegeItem from "./PrivilegeItem";
import Form from 'src/components/form/Form';
import useEditData from 'src/hooks/useEditData';

const generatePrivilegeObject = (state = false) => {
    const permissionsState = {}

    Object.keys(permissionsList).map(key => {
        permissionsState[key] = permissionsList[key].items.reduce((acc, cur) => {
            acc[cur.value] = state
            return acc
        }, {})
    })
    return permissionsState;
}

const Privilege = () => {
    const { id } = useParams()

    const [loading, setLoading] = useState(true)
    const [permissions, setPermissions] = useState(generatePrivilegeObject())

    const handleSelectAll = () => {
        setPermissions(generatePrivilegeObject(true))
    }

    const handleUnselectAll = () => {
        setPermissions(generatePrivilegeObject(false))
    }

    useEditData(
        '/users/find/' + id,
        ({ privileges = [] }) => {
            if (id) {
                setPermissions(({ ..._permissions }) => {
                    Object.keys(_permissions).forEach(key => {
                        Object.keys(_permissions[key]).forEach(innerKey => {
                            if (privileges.includes(innerKey)) {
                                _permissions[key][innerKey] = true
                            } else {
                                _permissions[key][innerKey] = false
                            }
                        })
                    })
                    return _permissions
                })
                setLoading(false)
            }
        }
    )

    const navigate = useNavigate()
    const handlers = {
        formData: () => {
            const permissionsArray = Object.keys(permissions).reduce((acc, cur) => {
                const innerArray = Object.keys(permissions[cur]).reduce((innerAcc, innerCur) => {
                    if (permissions[cur][innerCur]) {
                        return [...innerAcc, innerCur]
                    }
                    return innerAcc
                }, [])
                return [...acc, ...innerArray]
            }, [])
            return { privileges: permissionsArray }
        },
        afterSubmit: () => {
            navigate('/app/users')
        }
    }

    return (
        <>
            <Helmet>
                <title>Edit user privileges | Electro Leaf</title>
            </Helmet>
            <Form
                title="User privileges"
                subheader="Edit user privileges"
                handlers={handlers}
                action={"/users/privileges/" + id}
                method="PUT"
            >
                <Stack spacing={3} p={2}>
                    <Stack spacing={3} direction="row">
                        <Button
                            color="primary"
                            onClick={handleSelectAll}
                        >
                            Select all
                        </Button>
                        <Button
                            color="primary"
                            onClick={handleUnselectAll}
                        >
                            Unselect all
                        </Button>
                    </Stack>
                    <Grid container spacing={2}>
                        {Object.keys(permissions).map(key => (
                            <PrivilegeItem key={key} permissions={permissions} setPermissions={setPermissions} name={key} label={permissionsList[key].label} items={permissionsList[key].items} />
                        ))}
                    </Grid>
                </Stack>
            </Form>
        </>
    )
}

export default Privilege