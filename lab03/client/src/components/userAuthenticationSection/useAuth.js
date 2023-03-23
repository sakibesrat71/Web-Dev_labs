import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
	const navigate = useNavigate();
	const [isLoading, setLoading] = useState(true);
	useEffect(() => {
		(async () => {
			try {
                const token = localStorage.getItem('token');
				const response = await axios.post(`http://localhost:5001/auth/isLoggedIn`, { token });
				if (response.data.status !== true) {
					navigate(`/users/login`);
				}
			} catch (err) {
				navigate(`/sign-in`);
                console.log(err);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return { isLoading };
};

export { useAuth };
