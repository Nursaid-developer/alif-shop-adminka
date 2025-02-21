import { Button, Flex, Image, Popconfirm, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import Axios from '../api'
import { urls } from '../constants/urls'
import ProductsDrawer from '../components/ProductsDrawer'

function Products() {
  const [products, setProducts] = useState([])
  const [open, setOpen] = useState(false)
  const [editingData, setEditingData] = useState(null)

  const handleDelete = (data) => {
    Axios.delete(urls.products.delete(data.id))
      .then(res => {
        if (res.status === 200) {
          getProducts()
        }
      })
      .catch(err => console.log("Error: ", err))
      .finally(() => {
        getProducts()
      })
  }

  const handleEdit = (data) => {
    showDrawer()
    setEditingData(data)
  }

  const onCofirm = (item) => {
    handleDelete(item)
  }

  const colums = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (_, record) => (
        <Image src={record.img} width={100} />
      )
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => onCofirm(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button color='danger' variant='outlined'>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  function getProducts() {
    Axios.get(urls.products.get).then(res => setProducts(res.data))
  }

  function showDrawer() {
    setOpen(true)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <Flex justify='flex-end'>
        <Button type='primary' className='add-button' onClick={showDrawer}>+ Add product</Button>
      </Flex>
      <Table columns={colums} dataSource={products} rowKey={"id"} />
      <ProductsDrawer
        open={open}
        setOpen={setOpen}
        getProducts={getProducts}
        editingData={editingData}
        setEditingData={setEditingData}
      />
    </>
  )
}

export default Products