import { type ParsedLocation, redirect } from "@tanstack/react-router";

const ProtectRoute = async ({ location }: { location: ParsedLocation }) => {
	try {
		const result = await fetch("/api/auth/me");

		if (!result.ok) handleError(location);

		const user = await result.json();

		return user;
	} catch (error) {
		console.log(error);
		handleError(location);
	}
};

const handleError = (location: ParsedLocation) => {
	throw redirect({
		to: "/auth",
		search: {
			redirect: location.href,
		},
	});
};

export default ProtectRoute;
