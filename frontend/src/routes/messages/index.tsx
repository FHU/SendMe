import api from "@sendme/api";
import { SlButton, SlCard } from "@shoelace-style/shoelace/dist/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";

export const Route = createFileRoute("/messages/")({
	component: RouteComponent,
});

const AreaHeading = styled.h2``;

function RouteComponent() {
	return (
		<>
			<Link
				to="/conversation"
				className="messages"
				style={{
					display: "flex",
					flexDirection: "column",
					textDecoration: "none",
					color: "black",
				}}
			>
				<SlCard>
					<div style={{}}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<div
								style={{
									height: "20px",
									width: "20px",
									backgroundColor: "blue",
									borderRadius: "50%",
								}}
							></div>
							<img
								slot="image"
								style={{
									display: "grid",
									placeContent: "center",
									borderRadius: "50%",
									width: "100px",
									height: "100px",
									objectFit: "cover",
								}}
								src="../../../public/images/christian-buehner-DItYlc26zVI-unsplash.jpg"
							/>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
								}}
							>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
									}}
								>
									<h2 style={{ paddingLeft: "2%" }}>John Smith</h2>
									<p style={{ paddingLeft: "2%" }}>3:53 P.M.</p>
								</div>
								<p style={{ paddingLeft: "2%", maxWidth: "70%" }}>
									Hey! I heard about Servant's Day and I would love to
									contribute...
								</p>
							</div>
						</div>
					</div>
				</SlCard>
			</Link>
			<Link
				to="/conversation"
				className="messages"
				style={{
					display: "flex",
					flexDirection: "column",
					textDecoration: "none",
					color: "black",
				}}
			>
				<SlCard>
					<div style={{}}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<div
								style={{
									height: "20px",
									width: "20px",
									backgroundColor: "blue",
									borderRadius: "50%",
								}}
							></div>
							<img
								slot="image"
								style={{
									display: "grid",
									placeContent: "center",
									borderRadius: "50%",
									width: "100px",
									height: "100px",
									objectFit: "cover",
								}}
								src="../../../public/images/microsoft-365-7mBictB_urk-unsplash.jpg"
							/>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-around",
								}}
							>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
									}}
								>
									<h2 style={{ paddingLeft: "2%" }}>Clara Donovan</h2>
									<p style={{ paddingLeft: "2%" }}>1:23 P.M.</p>
								</div>
								<p style={{ paddingLeft: "2%", maxWidth: "70%" }}>
									Hello! My name is Clara and I was wondering if there might...
								</p>
							</div>
						</div>
					</div>
				</SlCard>
			</Link>
		</>
	);
}

