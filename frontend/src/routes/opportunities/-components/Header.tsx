import api, { type components } from "@sendme/api";
import styled from "styled-components";

import { SlRelativeTime } from "@shoelace-style/shoelace/dist/react";


interface HeaderProps {
	title: string;
	subtitle?: string;
  }
  
  const Header: React.FC<HeaderProps> = ({ }) => {
	return (
	  <header>
		<h1>Test Header</h1>
		<p>Test Subheader</p>
	  </header>
	);
  };
  
  export default Header;
  