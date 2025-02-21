import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react'
import Axios from '../api';
import { urls } from '../constants/urls';

function BannerModal({ isModalOpen, setIsModalOpen, getBanners, editingData, setEditingData }) {
    const [form] = Form.useForm()

    const closeModal = () => {
        setIsModalOpen(false);
        form.resetFields()
        setEditingData(null)
    };

    const handleOk = () => {
        form.submit()
    }; 

    useEffect(() => {
        form.setFieldValue(editingData)
    }, [editingData])

    const handleFinish = (values) => {
        if (editingData === null) {
            Axios.post(urls.banners.post, values).then(res => {
                if (res.status === 201) {
                    getBanners()
                }
            }
            )
                .catch(err => console.log('ERROR', err))
        } else {
            Axios.patch(urls.banners.edit(editingData.id), values).then(res => {
                if (res.status === 200) {
                    getBanners()
                }
            }
        )
        }
        closeModal()
    }

    return (

        <Modal title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={closeModal}>
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


            </Form>
        </Modal>
    )
}

export default BannerModal