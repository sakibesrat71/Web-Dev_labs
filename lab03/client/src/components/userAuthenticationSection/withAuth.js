
import { useAuth } from './useAuth';

const withAuth = (Component) => {
	const WrappedComponent = () => {
		const { isLoading } = useAuth();
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return isLoading ? <></> : <Component />;
	};
	return WrappedComponent;
};

export { withAuth };
