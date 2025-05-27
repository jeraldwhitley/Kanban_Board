// import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createTicket } from '../api/ticketAPI';
// import { TicketData } from '../interfaces/TicketData';
// import { UserData } from '../interfaces/UserData';
// import { retrieveUsers } from '../api/userAPI';

// const CreateTicket = () => {
//   const [newTicket, setNewTicket] = useState<TicketData | undefined>(
//     {
//       id: 0,
//       name: '',
//       description: '',
//       status: 'Todo',
//       assignedUserId: 1,
//       assignedUser: null
//     }
//   );

//   const navigate = useNavigate();

//   const [users, setUsers] = useState<UserData[] | undefined>([]);

//   const getAllUsers = async () => {
//     try {
//       const data = await retrieveUsers();
//       setUsers(data);
//     } catch (err) {
//       console.error('Failed to retrieve user info', err);
//     }
//   };

//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   const handleSubmit = async (e: FormEvent) => {
//   e.preventDefault();

//   if (!newTicket?.name || !newTicket.description) {
//     alert('Ticket name and description are required!');
//     return;
//   }

//   try {
//     const data = await createTicket(newTicket);
//     console.log(data);
//     navigate('/');
//   } catch (err) {
//     console.error('Failed to create ticket:', err);
//   }
// };


//   const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
//   };

//   const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setNewTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
//   }

//   const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
//   const { value } = e.target;
//   setNewTicket((prev) => (prev ? { ...prev, assignedUserId: Number(value) } : undefined));
// };


//   return (
//     <>
//       <div className='container'>
//         <form className='form' onSubmit=
//         {handleSubmit}>
//           <h1>Create Ticket</h1>
//           <label htmlFor='tName'>Ticket Name</label>
//           <textarea 
//             id='tName'
//             name='name'
//             value={newTicket?.name || ''}
//             onChange={handleTextAreaChange}
//             />
//           <label htmlFor='tStatus'>Ticket Status</label>
//           <select 
//             name='status' 
//             id='tStatus'
//             value={newTicket?.status || ''}
//             onChange={handleTextChange}
//           >
//             <option value='Todo'>Todo</option>
//             <option value='In Progress'>In Progress</option>
//             <option value='Done'>Done</option>
//           </select>
//           <label htmlFor='tDescription'>Ticket Description</label>
//           <textarea 
//             id='tDescription'
//             name='description'
//             value={newTicket?.description || ''}
//             onChange={handleTextAreaChange}
//           />
//           <label htmlFor='tUserId'>User's ID</label>
//           <select
//             name='assignedUserId'
//             value={newTicket?.assignedUserId || ''}
//             onChange={handleUserChange}
//           >
//             {users ? users.map((user) => {
//               return (
//                 <option key={user.id} value={String(user.id)}>
//                   {user.username}
//                 </option>
//               )
//             }) : (
//             <textarea 
//               id='tUserId'
//               name='assignedUserId'
//               value={newTicket?.assignedUserId || 0}
//               onChange={handleTextAreaChange}
//             />
//             )
//           }
//           </select>
//           <button type='submit' onSubmit={handleSubmit}>Submit Form</button>
//         </form>
//       </div>
//     </>
//   )
// };

// export default CreateTicket;

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';
import { UserData } from '../interfaces/UserData';
import { retrieveUsers } from '../api/userAPI';

const CreateTicket = () => {
  const [newTicket, setNewTicket] = useState<TicketData>({
    id: 0,
    name: '',
    description: '',
    status: 'Todo',
    assignedUserId: 1,
    assignedUser: null
  });

  const [users, setUsers] = useState<UserData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const data = await retrieveUsers();
        setUsers(data);
      } catch (err) {
        console.error('Failed to retrieve user info', err);
      }
    };

    getAllUsers();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    console.log('Assigned User ID:', newTicket.assignedUserId);
    e.preventDefault();

    if (!(newTicket.name?.trim()) || !(newTicket.description?.trim())) {
      alert('Ticket name and description are required!');
      return;
}

    console.log('Submitting new ticket:', newTicket);

    try {
      const data = await createTicket(newTicket);
      console.log('Created ticket:', data);
      navigate('/');
    } catch (err) {
      console.error('Failed to create ticket:', err);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setNewTicket(prev => ({
      ...prev,
      [name]: name === 'assignedUserId' ? Number(value) : value
    }));
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Create Ticket</h1>

        <label htmlFor='tName'>Ticket Name</label>
        <textarea
          id='tName'
          name='name'
          value={newTicket?.name ?? ''}
          onChange={handleChange}
          required
        />

        <label htmlFor='tStatus'>Ticket Status</label>
        <select
          id='tStatus'
          name='status'
          value={newTicket.status ?? ''}
          onChange={handleChange}
        >
          <option value='Todo'>Todo</option>
          <option value='In Progress'>In Progress</option>
          <option value='Done'>Done</option>
        </select>

        <label htmlFor='tDescription'>Ticket Description</label>
        <textarea
          id='tDescription'
          name='description'
          value={newTicket?.description ?? ''}
          onChange={handleChange}
          required
        />

        <label htmlFor='tUserId'>Assign to User</label>
        <select
          id='tUserId'
          name='assignedUserId'
          value={newTicket?.assignedUserId ?? ''}
          onChange={handleChange}
        >
          {users.map(user => (
            <option key={user.id} value={user.id ?? ''}>
              {user.username}
            </option>
          ))}
        </select>

        <button type='submit'>Submit Form</button>
      </form>
    </div>
  );
};

export default CreateTicket;
