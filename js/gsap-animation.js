(function ($) {
	"use strict";

	gsap.registerPlugin(ScrollTrigger, SplitText);
	gsap.config({
		nullTargetWarn: false,
		trialWarn: false
	});

	/*----  Functions  ----*/
	function getpercentage(x, y, elm) { 
		elm.find('.stackly-fid-inner').html(y + '/' + x);
		var cal = Math.round((y * 100) / x);
		return cal;
	}

	function stackly_title_animation() {
		ScrollTrigger.matchMedia({
			"(min-width: 1025px)": function() {

			var stackly_var = jQuery('.stackly-heading, .stackly-heading-subheading');
			if (!stackly_var.length) {
				return;
			}
			const quotes = document.querySelectorAll(".stackly-heading-subheading .stackly-title, .stackly-heading .stackly-title");

				quotes.forEach(quote => {

					//Reset if needed
					if (quote.animation) {
						quote.animation.progress(1).kill();
						quote.split.revert();
					}

					var getclass = quote.closest('.stackly-heading-subheading, .stackly-heading').className;
					var animation = getclass.split('animation-');
					if (animation[1] == "style4") return

					quote.split = new SplitText(quote, {
						type: "lines,words,chars",
						linesClass: "split-line"
					});
					gsap.set(quote, { perspective: 400 });

					if (animation[1] == "style1") {
						gsap.set(quote.split.chars, {
							opacity: 0,
							y: "90%",
							rotateX: "-40deg"
						});
					}
					if (animation[1] == "style2") {
						gsap.set(quote.split.chars, {
							opacity: 0,
							x: "50"
						});
					}
					if (animation[1] == "style3") {
						gsap.set(quote.split.chars, {
							opacity: 0,
						});
					}
					quote.animation = gsap.to(quote.split.chars, {
						scrollTrigger: {
							trigger: quote,
							start: "top 90%",
						},
						x: "0",
						y: "0",
						rotateX: "0",
						opacity: 1,
						duration: 1,
						ease: Back.easeOut,
						stagger: .02
					});
				});
			},
		});
	}

	function stackly_card_verticel_pinning() {
		var stackly_var = jQuery('.stackly-element-portfolio-style-2');
		if (!stackly_var.length) {
			return;
		}
		ScrollTrigger.matchMedia({
			"(min-width: 1025px)": function() {

				let stacklypanels = gsap.utils.toArray(".stackly-element-portfolio-style-2 .stackly-portfolio-style-2");
				const spacer = 0;
			
				let stacklyheight = stacklypanels[0].offsetHeight + 120;
				stacklypanels.forEach((stacklypanel, i) => { 
				TweenMax.set(stacklypanel, {top: i * 50});
				const tween = gsap.to(stacklypanel, {
					scrollTrigger: {
					trigger: stacklypanel,
					start: () => `top bottom-=100`,
					end: () => `top+=${150 + (stacklypanels.length * 2)}`,
					scrub: true, 
					//   invalidateOnRefresh: true
					},
					ease: "none",
					scale: () => 1 - (stacklypanels.length - i) * 0.025
				});
					ScrollTrigger.create({
						trigger: stacklypanel, 
						start: () => "top 140px", 
						endTrigger: '.stackly-element-portfolio-style-2', 
						end: `bottom top+=${stacklyheight + stacklypanels.length}`,
						pin: true, 
						pinSpacing: false, 
					});
				});
			},
			"(max-width:1024px)": function() {
				ScrollTrigger.getAll().forEach(stacklypanels => stacklypanels.kill(true));
			}
		});
	}

	function stackly_img_animation() {
		const boxes = gsap.utils.toArray('.stackly-animation-style1,.stackly-animation-style2,.stackly-animation-style3,.stackly-animation-style4,.stackly-animation-style5,.stackly-animation-style6,.stackly-animation-style7');
		boxes.forEach(img => {
			gsap.to(img, {
				scrollTrigger: {
					trigger: img,
					start: "top 70%",
					end: "bottom bottom",
					toggleClass: "active",
					once: true,
				}
			});
		});
	}

	var stackly_thia_sticky = function() {
		if(typeof jQuery.fn.theiaStickySidebar == "function"){
			jQuery('.stackly-sticky-sidebar').theiaStickySidebar({
				additionalMarginTop: 100
			});
			jQuery('.stackly-sticky-column').theiaStickySidebar({
				additionalMarginTop: 120
			});
		}
	}

	ScrollTrigger.matchMedia({
		"(max-width: 1200px)": function() {
			ScrollTrigger.getAll().forEach(t => t.kill());
		}
	});
 
		stackly_title_animation();
		stackly_thia_sticky();
	 

	// on resize
	jQuery(window).on('resize', function() {  
		stackly_title_animation();
		stackly_img_animation();
	});

	// on load 
	jQuery(window).on('load', function(){
		stackly_img_animation();
		stackly_card_verticel_pinning();
		gsap.delayedCall(1, () =>
			ScrollTrigger.getAll().forEach((t) => {
				t.refresh();
			})
		);	
	});	
})($);

