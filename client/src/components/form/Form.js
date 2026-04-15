import { useState, useEffect } from "react";
import {
    Box,
    Container,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid
} from '@mui/material';

const Form = ({ title, subheader, action, handlers: { verify = (() => true), formData = () => { }, afterSubmit, onError } = {}, method = 'POST', children, formonly, noContainer, fileUpload, submit, ...props }) => {

    const [isPending, setIsPending] = useState(false);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (verify()) {
    //         setIsPending(true);
    //         const data = formData();
    //         var form_data = new FormData();
    //         console.log(data)
    //         for (var key in data) {
    //             form_data.append(key, data[key]);
    //         }
    //         const options = { method, body: form_data }
    //         fetch(process.env.REACT_APP_API_HOST + action, options).then(data => {
    //             setIsPending(false)
    //             afterSubmit(data)
    //         }).catch(console.log)
    //     }
    // }
    const handleSubmit = (e) => {
        e?.preventDefault();
        const data = formData();
        const verification = verify(data);
        if (verification) {
            setIsPending(true);
            const options = (method === 'POST' || method === 'PUT') ? {
                headers: data instanceof FormData ? {} : { 'Content-Type': 'application/json' },
                body: (data instanceof FormData) ? data : JSON.stringify(data)
            } : {}
            fetch(process.env.REACT_APP_API_HOST + action, {
                method,
                ...options
            })
                .then(async res => {
                    if (res.status !== 200 && res.status !== 201) {
                        throw (await res.json())
                    }
                    return res.json()
                })
                .then(data => {
                    setIsPending(false)
                    afterSubmit(data)
                })
                .catch(e => {
                    setIsPending(false)
                    onError && onError(e)
                })
        }
    }

    useEffect(() => {
        if (submit) handleSubmit()
    }, [submit])

    if (formonly) {
        return (
            <form
                autoComplete="off"
                noValidate
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                {...props}
            >

                {children}

            </form>
        )
    } else if (noContainer) {
        return (
            <form
                autoComplete="off"
                noValidate
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                {...props}
            >
                <Card>
                    <CardHeader
                        subheader={subheader}
                        title={title}
                    />
                    <Divider />
                    <CardContent>
                        {children}
                    </CardContent>
                    <Divider />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2
                        }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            disabled={isPending}
                        >
                            Save details
                        </Button>
                    </Box>
                </Card>
            </form>
        )
    } else {
        return (

            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <form
                                autoComplete="off"
                                noValidate
                                encType="multipart/form-data"
                                onSubmit={handleSubmit}
                                {...props}
                            >
                                <Card>
                                    <CardHeader
                                        subheader={subheader}
                                        title={title}
                                    />
                                    <Divider />
                                    <CardContent>
                                        {children}
                                    </CardContent>
                                    <Divider />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            p: 2
                                        }}
                                    >
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                        >
                                            Save details
                                        </Button>
                                    </Box>
                                </Card>
                            </form>

                        </Grid>
                    </Grid>
                </Container>
            </Box>
        );
    }
}

export default Form;