import React, { useEffect, useState } from 'react'
import { Button, Drawer, Form, Input, InputNumber, Switch } from 'antd';
import Axios from '../api';
import { urls } from '../constants/urls';

function ProductsDrawer({ open, setOpen, getProducts, editingData, setEditingData }) {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue(editingData)
    }, [editingData])

    const handleFinish = (values) => {
        setLoading(true)
        if (editingData === null) {
            Axios.post(urls.products.post, values)
                .then(res => {
                    if (res.status === 201) {
                        getProducts()
                    }
                })
                .catch(err => {
                    console.log("Error: ", err)
                })
        } else {
            Axios.patch(urls.products.edit(editingData.id), values)
                .then(res => {
                    if (res.status === 200) {
                        getProducts()
                    }
                })
                .catch(err => console.log("Error: ", err)
                )

        }
        closeDrawer()
    }

    console.log(editingData);



    function closeDrawer() {
        setOpen(false)
        setLoading(false)
        form.resetFields()
        setEditingData(null)
    }
    return (
        <Drawer title={editingData === null ? "Add products": "Edit products"} onClose={closeDrawer} open={open} width={500}>
            <Form
                form={form}
                initialValues={{
                    remember: true,
                }}
                onFinish={handleFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="img"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Image!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Old price"
                    name="old_price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Old price!',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Price!',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Is Liked"
                    name="is_liked"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Is liked!',
                        },
                    ]}
                >
                    <Switch defaultChecked={false} />
                </Form.Item>

                <Form.Item label={null}>
                    <Button loading={loading} type="primary" htmlType="submit" className='submit-button'>
                        {editingData !== null ? "Edit" : "Add"}
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default ProductsDrawer