import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { retrieveAllMerchants } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
// Modal.setAppElement("#root");

function MerchantsListScreen(props) {
  const userRetrieveAllMerchants = useSelector(
    (state) => state.userRetrieveAllMerchants
  );
  const { loading, error, merchants } = userRetrieveAllMerchants;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveAllMerchants());
  }, [dispatch]);
  //   const [merchants, setMerchants] = useState([]);
  //   const [modalOpen, setModalOpen] = useState(false);

  //   const userSignin = useSelector((state) => state.userSignin);
  //   const { userInfo } = userSignin;

  //   const MerData = async () => {
  //     const response = await axios.get(
  //       "https://isaacpyth.pythonanywhere.com/api/retrievallemerchants/",
  //       {
  //         headers: {
  //           "content-type": "multipart/form-data",
  //           Authorization: `Bearer ${userInfo.token}`,
  //         },
  //       }
  //     );
  //     setMerchants(response.data.results);
  //   };

  //   useEffect(() => {
  //     MerData();
  //   }, []);

  //   const customStyles = {
  //     // overlay: {
  //     //   backgroundColor:'grey'
  //     // },

  //     content: {
  //       top: "50%",
  //       left: "50%",
  //       right: "auto",
  //       bottom: "auto",
  //       marginRight: "-50%",
  //       transform: "translate(-50%, -50%)",
  //       height: "300px",
  //       width: "400px",
  //       overflow: "hidden",
  //       display: "flex",
  //       justifyContent: "space-around",
  //       alignItems: "center",
  //       flexDirection: "column",
  //     },
  //   };

  return (
    <div>
      <h1>Merchants</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>MERCHANT ID</th>
                <th>USER ID</th>
                <th>COMPANY NAME</th>
                <th>STATUS</th>
                <th>PHONE NUMBER</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((merchant) => (
                <tr key={merchant.id}>
                  <td>{merchant.id}</td>
                  <td>{merchant.user_id}</td>
                  <td>{merchant.company_name}</td>
                  <td>{merchant.approval ? "APPROVED" : "PENDING"}</td>
                  <td>{merchant.telephone}</td>
                  <td>
                    <button type="button" className="small">
                      Edit
                    </button>
                    <button type="button" className="small">
                      Delete
                    </button>

                    <button
                      type="button"
                      className="small"
                      className={
                        merchant.approval
                          ? "btn-table-success"
                          : "btn-table-error"
                      }
                      // onClick={() => setModalOpen(true)}
                      onClick={() =>
                        props.history.push(`/merchants/${merchant.id}/edit`)
                      }
                    >
                      Conferm
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <Modal isOpen={modalOpen} style={customStyles}>
          {merchants.map((merchant) => (
            <div key={merchant.id}>
              <div>
                <div key={merchant.id}></div>
                <img src={merchant.photo_img} alt={merchant.company_name}></img>
              </div>
            </div>
          ))}
        </Modal> */}
        </div>
      )}
    </div>
  );
}

export default MerchantsListScreen;
