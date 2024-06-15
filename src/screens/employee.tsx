import { observer } from 'mobx-react';
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useAppContext } from '../utils/context';
import { Header } from '../components';
import '../styles/screens/employee.scss';
import { useEffect } from 'react';
import { Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { gql } from '@apollo/client';
import { client } from '../api/app';

const userData = [
  {
    name: {
      first: 'John',
      last: 'Doe',
    },
    isOnline: false,
    gender: 'male',
    job: 'worker',
    uuid: 'SomeId1',
    ban: {
      isBaned:true
    }
  },
];

const GET_USERS = gql`
query {
  findManyUsers {
    name {
      first
      last
    }
    gender
    uuid
    isOnline
    role
    job
    ban {
      isBaned
    }
  }
}
`;


const BAN_USER = gql`
  mutation BanUser($uuid: String!) {
    banUser(uuid: $uuid) 
  }
`;

function Employee() {
  const navigate = useNavigate();
  const { store } = useAppContext() 
  async function fetchUsers() {
    try {
      const { data } = await client.query({
        query: GET_USERS,
      });
      store.user.setUsers([])
      store.user.setUsers(data.findManyUsers)
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
  async function banUser(uuid:string) {
    try {
      console.log(uuid)
      await client.mutate({
        mutation: BAN_USER,
        variables: { uuid },
      });
      location.reload() 
    } catch (error) {
      console.error("Error baning user:", error);
      throw error;
    }
  }
  useEffect(()=> {
    fetchUsers()
    
  },[])
  
  const columns = [
    {
      accessorKey: "name.first",
      header: 'First Name',
      enableClickToCopy: true,
    },
    {
      accessorKey: "name.last",
      header: 'Last Name',
      enableClickToCopy: true,
    },
    {
      accessorKey: "isOnline",
      header: "Online",
      enableClickToCopy: true,
      Cell: ({ cell }: any) => (<Box component="span">{
        cell.getValue() ? 'Yes' : 'No'
      }</Box>),
    },
    {
      accessorKey: "job",
      header: "Job",
      enableClickToCopy: true,
    },
    {
      accessorKey: "role",
      header: "Role",
      enableClickToCopy: true,
    },
    {
      accessorKey: "ban.isBaned",
      header: "ban",
      enableClickToCopy: true,
      Cell: ({ cell }: any) => (<Box component="span">{
        cell.getValue() ? 'Yes' : 'No'
      }</Box>),
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: store.user.users ?? userData,
    enableRowActions: true,
    renderRowActionMenuItems: ({ row }) => [
      <MenuItem key="edit" onClick={() => {
        navigate(`/employees/editor/${row.original.uuid}`);
      }}>
        Edit
      </MenuItem>,
      <MenuItem key="delete" onClick={() => {
        banUser(row.original.uuid)
      }}>
        Ban/Unban
      </MenuItem>,
    ],
  });

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-main-bg dark:bg-main-dark-bg rounded-3xl">
      <Header category="Page" title="Employees" />
      <div className="bg-main-bg dark:bg-main-dark-bg">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
}

export default observer(Employee);
