
import { useAuth } from './useAuth';

const withAuth = (Component) => {
	console.log('withAuth');
	const WrappedComponent = () => {
		const { isLoading } = useAuth();
		return isLoading ? <>hh</> : <Component />;
	};
	return WrappedComponent;
};

export { withAuth };
