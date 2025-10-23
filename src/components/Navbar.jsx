import React from "react";
import "./css/Navbar.css";
import { motion } from "framer-motion";

const Navbar = () => {
	const variants = {
		initial: {
			fontWeight: 300
		},
		hover: {
			filter: ["blur(2px)", "blur(0)"],
			translate: ["-3px", "3px", 0],
			fontWeight: 600,
			transition: {
				duration: 0.3,
				ease: "easeOut"
			},
		}
	};
	return (
		<motion.nav
			className="navigation flex justify-around items-center bg-violet-950 text-white px-4 py-2 text-[1rem] select-none overflow-hidden"
			initial={{ background: "#000000", translateY: "-100px", opacity: 0 }}
			animate={{
				background: "#2e1065",
				translateY: 0,
				opacity: 1,
				transition: {
					type: "spring",
					duration: 2,
					height: { duration: 0.75 },
					translateY: { duration: 1, delay: 1 },
				},
			}}
		>
			<span className="text-[1.6em] font-bold leading-[1.5] sm:inline hidden">iTask</span>
			<ul className="navbar text-[1.1em] flex gap-0 font-[poppins] relative md:left-24">
				<li>
					<motion.a
						className="nav-links "
						href="#"
						initial="initial"
						whileHover={"hover"}
						variants={variants}
					>
						Home
					</motion.a>
				</li>
				<li>
					<motion.a
						className="nav-links "
						href="#"
						initial="initial"
						whileHover={"hover"}
						variants={variants}
					>
						Your Tasks
					</motion.a>
				</li>
				<li>
					<motion.a
						className="nav-links "
						href="#"
						initial="initial"
						whileHover={"hover"}
						variants={variants}
					>
						About
					</motion.a>
				</li>
			</ul>
		</motion.nav>
	);
};

export default Navbar;
