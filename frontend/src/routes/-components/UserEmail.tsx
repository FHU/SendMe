import api from "@sendme/api";

export function UserEmail() {
	const { data: user, isLoading, isLoadingError } = api.auth.getMe.useQuery();

	if (isLoadingError) {
		return <div>Loading Error!</div>;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <div>User not found</div>;
	}

	return <div>{user.email}</div>;
}
