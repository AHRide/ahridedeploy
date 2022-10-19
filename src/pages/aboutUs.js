import React from 'react';
import NavBarClient from '../components/NavBarClient';
import { Link } from 'react-router-dom';

function AboutUs() {
	return (
		<>
			<NavBarClient />
			<main>
				<h2>Who are we?</h2>
				<p>That feels like an existential question, don't you think?</p>
			</main>
			<nav>
				<Link to='/'>Home</Link>
			</nav>
		</>
	);
}

export default AboutUs;
