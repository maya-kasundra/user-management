import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/user/thunk/get'
// import Table from 'react-bootstrap/Table'
import { Button, Input, Modal, Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { deleteUser } from '../../redux/user/thunk/delete'
import { putUser } from '../../redux/user/thunk/put'
import { postUser } from '../../redux/user/thunk/post'

// import { useParams } from 'react-router-dom'

const ApplyUser = () => {
  // const id = useParams()
  // console.log(id)
  const [isEditing, setIsEditing] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [userData, setUserData] = useState([])
  const dispatch = useDispatch()
  const data = useSelector((state) => state.user.get.list)

  // call fetch user data API
  useEffect(() => {
    dispatch(getUser())
  }, [])

  // get data form state and set in userData
  useEffect(() => {
    setUserData(data)
  }, [data])
  // console.log(data)

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
                  onEditUser(record)
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

  // delete user info function
  const Delete = (record) => {
    // console.log('record---->', record)
    Modal.confirm({
      title: 'Are you sure you want to delete this',
      onOk: () => {
        dispatch(deleteUser(record.id))
        setUserData((data) => {
          // console.log('userdata:', data)
          return data.filter((person) => person.id !== record.id)
        })
      },
    })
  }
  // create new user
  const onAddUser = () => {
    dispatch(postUser())
    console.log(postUser())
    const newStudent = {
      id: 407554,
      name: 'Vrinda Mehra',
      email: 'vrinda_mehra@roob.co',
      gender: 'female',
      status: 'active',
    }
    setUserData((pre) => {
      return [...pre, newStudent]
    })
  }

  const onEditUser = (record) => {
    console.log('edit user record', record)
    setIsEditing(true)
    setEditingStudent({ ...record })
  }

  const resetEditing = () => {
    setIsEditing(false)
    setEditingStudent(null)
  }

  return (
    <div className="app">
      <Button onClick={() => onAddUser()}>Add a new User</Button>
      <div className="table">
        <Table
          dataSource={userData}
          columns={columns}
          // pagination={{ pageSize: 2, total: 10 }}
        />
        ;
        <Modal
          title="Edit User"
          open={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing()
          }}
          onOk={() => {
            dispatch(putUser(editingStudent))
            console.log('edit student', editingStudent)
            setUserData((pre) => {
              return pre.map((user, index) => {
                if (user.id === editingStudent.id) {
                  return editingStudent
                } else {
                  return user
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

export default ApplyUser
