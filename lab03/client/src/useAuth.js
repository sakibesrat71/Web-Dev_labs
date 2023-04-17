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

				const response = await axios.get(`http://localhost:5001/auth/loggedin`,
					{
						headers: {
							'Content-Type': 'application/json',
							'auth-token': `${token}`
						}
					});
				console.log(response.status);
				if (response.status !== 200) {
					navigate(`/login`);
					console.log('status is not 200');
				}
			} catch (err) {
				 navigate(`/login`);
				console.log(err);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return { isLoading };
};

export { useAuth };
