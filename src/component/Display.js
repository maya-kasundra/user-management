import axios from 'axios'
import { useEffect, useState } from 'react'
import React from 'react'
import { Input, Modal, Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { userEndPoint } from '../api/api-end-point'

const Display = () => {
  const url = 'https://gorest.co.in/public/v2/'
  const [isEditing, setIsEditing] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [data, setData] = useState([])
  const columns = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: 'gender',
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
    },
    {
      key: 'action',
      title: 'Actions',
      render: (record) => {
        return (
          <>
            <div className="flex">
              <EditOutlined
                onClick={() => {
                  onEditStudent(record)
                }}
              />
              <DeleteOutlined
                style={{ color: 'red', marginLeft: 12 }}
                onClick={() => Delete(record)}
              />
            </div>
          </>
        )
      },
    },
  ]

  // console.log('data--->', data)

  useEffect(() => {
    getAllData()
  }, [])

  const Delete = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this',
      onOk: () => {
        setData((data) => {
          return data.filter((person) => person.id !== record.id)
        })
      },
    })
  }

  const onEditStudent = (record) => {
    setIsEditing(true)
    setEditingStudent({ ...record })
  }

  const getAllData = () => {
    axios.get(`${url}${userEndPoint}`).then((response) => {
      setData(response.data)
      // console.log(response.data)
    })
  }

  const resetEditing = () => {
    setIsEditing(false)
    setEditingStudent(null)
  }
  return (
    <div className="app">
      <div className="table">
        {/* <Table dataSource={data} columns={columns} pagination={false} /> */}
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 2, total: 10 }}
        />
        ;
        <Modal
          title="Edit Student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing()
          }}
          onOk={() => {
            setData((pre) => {
              return pre.map((student) => {
                if (student.id === editingStudent.id) {
                  return editingStudent
                } else {
                  return student
                }
              })
            })
            resetEditing()
          }}
        >
          <Input
            value={editingStudent?.name}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, name: e.target.value }
              })
            }}
          />

          <Input
            value={editingStudent?.email}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, email: e.target.value }
              })
            }}
          />

          <Input
            value={editingStudent?.gender}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, gender: e.target.value }
              })
            }}
          />
          <Input
            value={editingStudent?.status}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, status: e.target.value }
              })
            }}
          />
        </Modal>
      </div>
    </div>
  )
}

export default Display
