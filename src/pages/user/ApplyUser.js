import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/user/thunk/get'
// import Table from 'react-bootstrap/Table'
import { Button, Input, Modal, Table, Form, Checkbox } from 'antd'
// import { Button, Checkbox, Form, Input } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { deleteUser } from '../../redux/user/thunk/delete'
import { putUser } from '../../redux/user/thunk/put'
import { postUser } from '../../redux/user/thunk/post'
import './ApplyUser.css'
import ModalForm from './ModalForm'
import { ToastContainer, toast } from 'react-toastify'

const ApplyUser = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [creatingStudent, setCreatingStudent] = useState(null)
  const [userData, setUserData] = useState([])
  const dispatch = useDispatch()
  const [createName, setCreateName] = useState('')
  const [createEmail, setCreateEmail] = useState('')
  const [createGender, setCreateGender] = useState('')
  const [createStatus, setCreateStatus] = useState('')
  const [createId, setCreateId] = useState('')

  const data = useSelector((state) => state.user.get.list)
  // const postData = useSelector((state) => state.user.post)
  // console.log(postData)
  const notify = () => toast('Wow so easy!')

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
      sorter: (a, b) => a.name > b.name,
      sortDirections: ['descend'],
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name > b.name,
      sortDirections: ['descend'],
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : [])
                confirm({ closeDropdown: false })
              }}
              onPressEnter={() => {
                confirm()
              }}
              onBlur={() => {
                confirm()
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm()
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters()
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.name > b.name,
      sortDirections: ['descend'],
    },
    {
      key: 'gender',
      title: 'Gender',
      dataIndex: 'gender',
      sorter: (a, b) => a.name > b.name,
      sortDirections: ['descend'],
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.name > b.name,
      sortDirections: ['descend'],
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
      title: `are you sure you want to delete ${record.name}`,
      onOk: () => {
        dispatch(deleteUser(record.id))
        setUserData((data) => {
          // console.log('userdata:', data)
          return data.filter((person) => person.id !== record.id)
        })
      },
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

  const onCreateUser = () => {
    // console.log('create user record', record)
    setIsCreating(true)
    setCreatingStudent()
  }

  const resetCreating = () => {
    setIsCreating(false)
    setCreatingStudent(null)
  }

  const onFinish = (values) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  // create new user
  const onAddUser = () => {
    // console.log('add clicked', createId)
    const newStudent = {
      id: createId,
      name: createName,
      email: createEmail,
      gender: createGender,
      status: createStatus,
    }
    // console.log('new student is', newStudent)
    dispatch(postUser(newStudent))
    setUserData((data) => {
      return [...data, newStudent]
      // console.log(data)
    })
    console.log(data)
  }

  return (
    <div
      className="app"
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        padding: 20,
      }}
    >
      <h4 className="text-center mt-4">CRUD API USING REDUX</h4>
      <div className="addButton">
        {/* <Button onClick={() => onAddUser()} className="addUser"> */}
        <Button
          className="addUser"
          onClick={() => {
            onCreateUser()
          }}
        >
          Add a new User
        </Button>
      </div>

      <div className="table">
        <Table
          dataSource={userData}
          columns={columns}
          // pagination={{ pageSize: 5, total: 10 }}
          rowClassName={() => 'rowClassName1'}
          bordered
        />
        ;{/* Modal for create user */}
        <Modal
          title="Create New User"
          open={isCreating}
          // okText="Save"
          onCancel={() => {
            resetCreating()
          }}
          footer={null}
          // onOk={() => {
          //   // dispatch(putUser(editingStudent))
          //   // console.log('edit student', editingStudent)
          //   setUserData((pre) => {
          //     return pre.map((user, index) => {
          //       if (user.id === editingStudent.id) {
          //         return editingStudent
          //       } else {
          //         return user
          //       }
          //     })
          //   })
          //   resetCreating()
          // }}
        >
          <Form
            open={isCreating}
            name="basic"
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 14,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Id"
              name="id"
              rules={[
                {
                  required: true,
                  message: 'Please input your Id !',
                },
              ]}
            >
              <Input
                placeholder="Enter Id"
                type="number"
                value={createId}
                onChange={(e) => setCreateId(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username !',
                },
              ]}
            >
              <Input
                placeholder="Enter Username"
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="Email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email !',
                },
              ]}
            >
              <Input
                placeholder="Enter Email"
                value={createEmail}
                onChange={(e) => setCreateEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="Gender"
              rules={[
                {
                  required: true,
                  message: 'Please input your Gender !',
                },
              ]}
            >
              <Input
                placeholder="Enter Gender"
                value={createGender}
                onChange={(e) => setCreateGender(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Status"
              name="Status"
              rules={[
                {
                  required: true,
                  message: 'Please input your Status !',
                },
              ]}
            >
              <Input
                placeholder="Enter Status"
                value={createStatus}
                onChange={(e) => setCreateStatus(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => onAddUser()}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        {/* edit Modal started */}
        <Modal
          title="Edit Existing User"
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
          <span>Name:</span>
          <Input
            name="Edit Id"
            value={editingStudent?.name}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, name: e.target.value }
              })
            }}
          />
          <span>Email:</span>
          <Input
            value={editingStudent?.email}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, email: e.target.value }
              })
            }}
          />
          <span>Gender:</span>
          <Input
            value={editingStudent?.gender}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, gender: e.target.value }
              })
            }}
          />
          <span>Status:</span>
          <Input
            value={editingStudent?.status}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, status: e.target.value }
              })
            }}
          />
          <ToastContainer />
        </Modal>
      </div>
    </div>
  )
}

export default ApplyUser

export const toastNotify = (type, message) =>
  toast(`${message}`, {
    position: 'top-center',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type,
  })
