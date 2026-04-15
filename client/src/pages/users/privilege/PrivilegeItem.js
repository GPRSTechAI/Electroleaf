import { Stack, Grid, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useMemo } from "react";

const PrivilegeItem = ({ permissions, setPermissions, name, label, items }) => {

    const handleChangeAll = e => {
        // console.log(e.target.name, e.target.checked)
        setPermissions(({ ..._permissions }) => {
            if (!e.target.checked) {
                Object.keys(_permissions[name]).map(key => {
                    _permissions[name][key] = false
                })
            } else {
                Object.keys(_permissions[name]).map(key => {
                    _permissions[name][key] = true
                })
            }
            return _permissions
        })
    }

    const handleChange = e => {
        setPermissions(({ ...permissions }) => {
            permissions[name][e.target.name] = e.target.checked
            return permissions
        })
    }

    const allSelected = useMemo(() => {
        const obj = permissions[name]
        return Object.keys(obj).reduce((acc, cur) => obj[cur] && acc, true)
    }, [permissions])

    return (
        <>
            <Grid item xs={12} sm={6} >
                <FormGroup>
                    <FormControlLabel control={<Checkbox name={name} onChange={handleChangeAll} checked={allSelected} />} label={label} />
                </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormGroup sx={{ ml: 2 }}>
                    {items.map((item, id) => (
                        <FormControlLabel key={id} control={<Checkbox name={item.value} checked={permissions[name][item.value]} onChange={handleChange} />} label={item.label} />
                    ))}
                </FormGroup>
            </Grid>
        </>
    );
}

export default PrivilegeItem;