import { useContext, useEffect } from "react";
import Router from "./routing/Router";
import { DataContext } from "./components/dataProvider/DataProvider.jsx"; // correct context
import { auth } from "./Utility/firebase.js";
import { type } from "./Utility/actionType.js";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: type.SET_USER,
          user: null,
        });
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return <Router />;
}

export default App;
