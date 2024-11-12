import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const userEmail = useSelector((state) => state.email); // Fetch email from Redux state
  const [udob, setUdob] = useState("");
  const [ug, setUg] = useState("");
  const [uc, setUc] = useState("");
  const [us, setUs] = useState("");
  const [ucity, setUcity] = useState("");
  const [up, setUp] = useState("");
  const [image, setImage] = useState(null); // State for image file
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user profile data on component mount
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:5000/profile", { email: userEmail });
        setUser(response.data.user);
      } catch (error) {
        setError("Failed to load profile.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userEmail]);

  const handledata = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("dob", udob);
      formData.append("gender", ug);
      formData.append("country", uc);
      formData.append("state", us);
      formData.append("city", ucity);
      formData.append("pin_code", up);
      formData.append("email", userEmail);
      formData.append("image", image);

      const response = await axios.put('http://localhost:5000/photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        alert("Profile updated successfully!");
        setUser(response.data.user);
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      console.error("Error updating profile", err);
      alert("There was an error updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='ppart'>
      <h1>Welcome, {user.first_name}</h1>
      <p>Name: {user.first_name} {user.last_name}</p>
      <p>Email: {userEmail}</p>
      <p>Phone number: {user.phone}</p>

      {/* Display or update Date of Birth */}
      <div className='p1'>
        {user.dob ? (
          <p>Date of Birth: {user.dob}</p>
        ) : (
          <div id="s1">
            <label htmlFor="dob" className='lp'>Date of Birth: </label>
            <input
              type="date"
              name="dob"
              className='ip'
              onChange={(e) => setUdob(e.target.value)}
              value={udob}
              placeholder="Enter Date of Birth"
              required
            />
          </div>
        )}
      </div>

      {/* Display or update Profile Picture */}
      <div className='p1'>
        {user.imageurl ? (
          <p>Photo: <img src={`http://localhost:5000${user.imageurl}`} alt={user.first_name} style={{ width: '200px', height: '200px' }} /></p>
        ) : (
          <div id="s1">
            <label htmlFor="img" className='lp'>Picture:</label>
            <input
              type="file"
              name="img"
              className='ip'
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        )}
      </div>

      {/* Display or update Gender */}
      <div className='p1'>
        {user.gender ? (
          <p>Gender: {user.gender}</p>
        ) : (
          <div id="s1">
            <label htmlFor="gender" className='lp'>Gender: </label>
            <label htmlFor="g_male" className='lp'>Male</label>
            <input type="radio" id="g_male" name="gender" onChange={(e) => setUg(e.target.value)} value="Male" checked={ug === "Male"} required />
            <label htmlFor="g_female" className='lp'>Female</label>
            <input type="radio" id="g_female" name="gender" onChange={(e) => setUg(e.target.value)} value="Female" checked={ug === "Female"} required />
            <label htmlFor="g_other" className='lp'>Other</label>
            <input type="radio" id="g_other" name="gender" onChange={(e) => setUg(e.target.value)} value="Other" checked={ug === "Other"} required />
          </div>
        )}
      </div>

      {/* Display or update Country */}
      <div className='p1'>
        {user.country ? (
          <p>Country: {user.country}</p>
        ) : (
          <div id="s1">
            <label htmlFor="country" className='lp'>Enter Country: </label>
            <input type="text" name="country" className='ip' onChange={(e) => setUc(e.target.value)} value={uc} placeholder="Enter Country" required />
          </div>
        )}
      </div>

      {/* Display or update State */}
      <div className='p1'>
        {user.state ? (
          <p>State: {user.state}</p>
        ) : (
          <div id="s1">
            <label htmlFor="state" className='lp'>Enter State: </label>
            <input type="text" name="state" className='ip' onChange={(e) => setUs(e.target.value)} value={us} placeholder="Enter State" required />
          </div>
        )}
      </div>

      {/* Display or update City */}
      <div className='p1'>
        {user.city ? (
          <p>City: {user.city}</p>
        ) : (
          <div id="s1">
            <label htmlFor="city" className='lp'>Enter City: </label>
            <input type="text" name="city" className='ip' onChange={(e) => setUcity(e.target.value)} value={ucity} placeholder="Enter City" required />
          </div>
        )}
      </div>

      {/* Display or update Pin Code */}
      <div className='p1'>
        {user.pin_code ? (
          <p>Pin Code: {user.pin_code}</p>
        ) : (
          <div id="s1">
            <label htmlFor="pin" className='lp'>Pin Code: </label>
            <input type="text" name="pin" className='ip' onChange={(e) => setUp(e.target.value)} value={up} placeholder="Enter Pin Code" required />
          </div>
        )}
      </div>

      <button onClick={handledata}>Submit</button>
    </div>
  );
};

export default Profile;
