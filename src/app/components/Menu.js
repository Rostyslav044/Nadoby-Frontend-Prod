// 'use client';

// import { useDispatch, useSelector } from 'react-redux';
// import { logout, loadFromStorage } from '../store/authSlice';
// import { useEffect } from 'react';
// import UserMenu from './UserMenu';
// import NoAutorazeMenu from './NoAutorazeMenu';





// export default function Menu() {
//   const dispatch = useDispatch();
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   // useEffect(() => {
//   //   dispatch(loadFromStorage());
//   // }, [dispatch]);



//   return (
//     <div>
//       {isAuthenticated === true? (
//         <UserMenu/>
//       ) : (
//         <NoAutorazeMenu />
//       )}
//     </div>
//   );
// }





'use client';

import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';
import NoAutorazeMenu from './NoAutorazeMenu';

export default function Menu({ onClose }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div>
      {isAuthenticated === true ? (
        <UserMenu onClose={onClose} />
      ) : (
        <NoAutorazeMenu onClose={onClose} />
      )}
    </div>
  );
}

