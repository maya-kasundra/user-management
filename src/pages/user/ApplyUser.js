import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/user/thunk/get'
// import Table from 'react-bootstrap/Table'
import { Button, Input, Modal, Table } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { deleteUser } from '../../redux/user/thunk/delete'
import { putUser } from '../../redux/user/thunk/put'
import { postUser } from '../../redux/user/thunk/post'
import './ApplyUser.css'
import { useNavigate } from 'react-router-dom'

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

  const data = useSelector((state) => state.user.get.list)
  // const postData = useSelector((state) => state.user.post)
  // console.log(postData)

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
  // create new user
  // const onAddUser = () => {
  // console.log(postUser())
  // const newStudent = {
  //   id: 408350,
  //   name: 'sujal',
  //   email: 'vrinda_mehra@roob.co',
  //   gender: 'female',
  //   status: 'active',
  // }
  // dispatch(postUser(newStudent))
  // setUserData((pre) => {
  //   return [...pre, newStudent]
  // })
  // }

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
          pagination={{ pageSize: 5, total: 10 }}
          rowClassName={() => 'rowClassName1'}
          bordered
        />
        ;
        <Modal
          title="Create New User"
          open={isCreating}
          okText="Save"
          onCancel={() => {
            resetCreating()
          }}
          onOk={() => {
            // dispatch(putUser(editingStudent))
            // console.log('edit student', editingStudent)
            setUserData((pre) => {
              return pre.map((user, index) => {
                if (user.id === editingStudent.id) {
                  return editingStudent
                } else {
                  return user
                }
              })
            })
            resetCreating()
          }}
        >
          <span>Name:</span>
          <Input />
          <span>Email:</span>
          <Input />
          <span>Gender:</span>
          <Input />
          <span>Status:</span>
          <Input />
        </Modal>
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
        </Modal>
      </div>
    </div>
  )
}

export default ApplyUser
