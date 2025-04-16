import {
	SlButton,
	SlButtonGroup,
	SlIcon,
	SlTag,
} from "@shoelace-style/shoelace/dist/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/*const TagsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-shrink: 0;
`;*/

const tags = [
	"Preacher",
	"Youth",
	"Education",
	"Leadership",
	"Paid",
	"Education",
	"Leadership",
	"Paid",
	"Leadership",
	"Paid",
	"Education",
	"Leadership",
	"Paid",
];

const OppTags = () => {
	const settings = {
		dots: false,
		infinite: false,
		speed: 250,
		slidesToShow: 5,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: { slidesToShow: 5 },
			},
			{
				breakpoint: 600,
				settings: { slidesToShow: 5 },
			},
		],
	};
	return (
		<>
			<div
				style={{ width: "100%", padding: "20px", backgroundColor: "#121212" }}
			>
				<Slider {...settings}>
					{tags.map((tag, id) => (
						<div key={tag}>
							<SlTag variant="success" size="medium">
								{tag}
							</SlTag>
						</div>
					))}
				</Slider>
			</div>
		</>
	);
};

export default OppTags;
