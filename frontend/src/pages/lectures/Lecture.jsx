import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../config";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  // const [completed, setCompleted] = useState(0);
  // const [completedLec, setCompletedLec] = useState(0);
  // const [lectLength, setLectLength] = useState(0);
  // const [progress, setProgress] = useState([]);

  /* -------------------- ACCESS CONTROL -------------------- */
  useEffect(() => {
  if (!user) return;

  if (
    user.role !== "admin" &&
    !user.subscription?.includes(params.id)
  ) {
    navigate("/");
    return;
  }
  fetchLectures();
}, [user, params.id]);


  /* -------------------- FETCH ALL LECTURES -------------------- */
  const fetchLectures = async () => {
    try {
      const { data } = await axios.get(
        `${server}/api/lectures/${params.id}`,
        {
          headers: {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
},

        }
      );
      setLectures(data.lectures);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- FETCH SINGLE LECTURE -------------------- */
  const fetchLecture = async (id) => {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
},

      });
      setLecture(data.lecture);
    } catch (error) {
      console.log(error);
    } finally {
      setLecLoading(false);
    }
  };

  /* -------------------- FETCH PROGRESS (SAFE) -------------------- */
//   const fetchProgress = async () => {
//  try {
//       const { data } = await axios.get(
//         `${server}/api/user/progress?course=${params.id}`,
//         {
//           headers: {
//             token: localStorage.getItem("token"),
//           },
//         }
//       );

//       setCompleted(data.courseProgressPercentage || 0);
//       setCompletedLec(data.completedLectures || 0);
//       setLectLength(data.allLectures || 0);
//       setProgress(data.progress || []);
//     } catch (error) {
//       console.log("Progress not available yet");
//     }
//   };

  /* -------------------- ADD PROGRESS -------------------- */
//   const addProgress = async (id) => {
//     try {
//       await axios.post(
//         `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
//         {},
//         {
//           headers: {
//               token: localStorage.getItem("token"),
// },

//         }
//       );
//       fetchProgress();
//     } catch (error) {
//       console.log(error);
//     }
//   };

  /* -------------------- VIDEO UPLOAD -------------------- */
  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  /* -------------------- ADD LECTURE -------------------- */
  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
},

        }
      );

      toast.success(data.message);
      setShow(false);
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
      fetchLectures();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    } finally {
      setBtnLoading(false);
    }
  };

  /* -------------------- DELETE LECTURE -------------------- */
  const deleteHandler = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lecture?"))
      return;

    try {
      const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
        headers: {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
},

      });
      toast.success(data.message);
      fetchLectures();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  /* -------------------- INIT -------------------- */
  useEffect(() => {
    fetchLectures();
    
  }, [params.id]);

  /* -------------------- UI -------------------- */
  if (loading) return <Loading />;

  return (
    <>
      

      <div className="lecture-page">
        {/* LEFT */}
        <div className="left">
          {lecLoading ? (
            <Loading />
          ) : lecture.video ? (
            <>
              <video
                src={`${server}/${lecture.video}`}
                width="100%"
                controls
                autoPlay
                // onEnded={() => addProgress(lecture._id)}
              ></video>
              <h1>{lecture.title}</h1>
              <h3>{lecture.description}</h3>
            </>
          ) : (
            <h1>Please Select a Lecture</h1>
          )}
        </div>

        {/* RIGHT */}
        <div className="right">
          {user?.role === "admin" && (
            <button className="common-btn" onClick={() => setShow(!show)}>
              {show ? "Close" : "Add Lecture +"}
            </button>
          )}

          {show && (
            <div className="lecture-form">
              <h2>Add Lecture</h2>
              <form onSubmit={submitHandler}>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <input type="file" onChange={changeVideoHandler} required />
                {videoPrev && (
                  <video src={videoPrev} width={300} controls />
                )}
                <button
                  className="common-btn"
                  type="submit"
                  disabled={btnLoading}
                >
                  {btnLoading ? "Please wait..." : "Add"}
                </button>
              </form>
            </div>
          )}

          {lectures.length > 0 ? (
            lectures.map((e, i) => (
              <div key={e._id}>
                <div
                  onClick={() => fetchLecture(e._id)}
                  className={`lecture-number ${
                    lecture._id === e._id ? "active" : ""
                  }`}
                >
                  {i + 1}. {e.title}
                  {/* {progress[0]?.completedLectures?.includes(e._id) && (
                    <span style={{ marginLeft: 10, color: "green" }}>
                      <TiTick />
                    </span>
                  )} */}
                </div>

                {user?.role === "admin" && (
                  <button
                    className="common-btn"
                    style={{ background: "red" }}
                    onClick={() => deleteHandler(e._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No Lectures Yet!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Lecture;
