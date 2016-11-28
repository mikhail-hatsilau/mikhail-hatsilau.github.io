webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _api = __webpack_require__(14);
	
	__webpack_require__(16);
	
	var _default = __webpack_require__(18);
	
	var _default2 = _interopRequireDefault(_default);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var shouldLoad = true;
	var loading = false;
	var upButton = document.querySelector('.up-button');
	var loader = document.querySelector('.loader');
	
	var renderReviewItem = function renderReviewItem(review) {
	    var reviewLinkInfo = review.link,
	        multimedia = review.multimedia;
	
	    var reviewItem = document.createElement('div');
	    reviewItem.className = 'reviews__item';
	    reviewItem.innerHTML = '\n        <img src="' + (multimedia ? multimedia.src : _default2.default) + '">\n        <div>\n            <h3 class="reviews__item-title">' + review.display_title + '</h3>\n            <div class="reviews__item-headline">' + review.headline + '</div>\n            <a href="' + reviewLinkInfo.url + '">' + reviewLinkInfo.suggested_link_text + '</a>\n        </div>\n    ';
	    return reviewItem;
	};
	
	var renderReviews = function renderReviews(reviews) {
	    var reviewsContainer = document.querySelector('.reviews');
	    reviews.forEach(function (review) {
	        return reviewsContainer.appendChild(renderReviewItem(review));
	    });
	};
	
	var showLoader = function showLoader() {
	    loader.style.display = 'block';
	};
	
	var hideLoader = function hideLoader() {
	    loader.style.display = '';
	};
	
	var fetchAllReviews = function fetchAllReviews(offset) {
	    if (!shouldLoad || loading) {
	        return;
	    }
	    loading = true;
	    showLoader();
	    (0, _api.fetchReviews)(offset).then(function (data) {
	        shouldLoad = data.has_more;
	        loading = false;
	        hideLoader();
	        renderReviews(data.results);
	    }, function () {
	        loading = false;
	        hideLoader();
	    });
	};
	
	var showUpButton = function showUpButton() {
	    upButton.classList.add('visible');
	};
	
	var hideUpButton = function hideUpButton() {
	    upButton.classList.remove('visible');
	};
	
	exports.default = function () {
	    upButton.addEventListener('click', function () {
	        window.scrollTo(0, 0);
	    });
	
	    window.addEventListener('scroll', function () {
	        var scrollY = this.scrollY || document.documentElement.scrollTop;
	        if (scrollY >= 100) {
	            showUpButton();
	        } else {
	            hideUpButton();
	        }
	        if (this.innerHeight + scrollY >= document.body.offsetHeight) {
	            var reviewsCount = document.querySelectorAll('.reviews__item').length;
	            fetchAllReviews(reviewsCount);
	        }
	    });
	
	    fetchAllReviews();
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.fetchReviews = undefined;
	
	var _constants = __webpack_require__(15);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var fetchReviews = exports.fetchReviews = function fetchReviews() {
	    var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    return fetch(_constants2.default.API_BASE_URL + '/movies/v2/reviews/all.json?api-key=' + _constants2.default.API_KEY + '&offset=' + offset).then(function (response) {
	        return response.json();
	    });
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    API_BASE_URL: 'https://api.nytimes.com/svc',
	    API_KEY: 'fabe5fabfc5b44ea8e829b1c6406eac2'
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(17, function() {
				var newContent = __webpack_require__(17);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".reviews {\n  max-width: 940px;\n  background-color: rgba(255, 255, 255, 0.5);\n  margin: 0 auto;\n}\n\n.reviews__item {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.3);\n  padding: 10px;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n@media (max-width: 480px) {\n  .reviews__item {\n    -ms-flex-direction: column;\n        flex-direction: column;\n    text-align: center;\n    -ms-flex-align: center;\n        align-items: center;\n  }\n}\n\n.reviews__item:last-child {\n  border-bottom: none;\n}\n\n.reviews__item img {\n  margin-right: 10px;\n  height: 140px;\n  width: 210px;\n}\n\n.reviews__item a {\n  text-decoration: none;\n  color: black;\n  display: inline-block;\n  margin-top: 10px;\n  font-size: 14px;\n  font-style: italic;\n}\n\n.reviews__item a:hover {\n  text-decoration: underline;\n}\n\n.reviews__item-headline {\n  font-size: 16px;\n}\n\n.reviews__item > div {\n  -ms-flex-positive: 1;\n      flex-grow: 1;\n}\n\n.visible {\n  visibility: visible;\n  opacity: 0.5;\n}", ""]);
	
	// exports


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "default.jpg";

/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vRDovTGVhcm5pbmcvRnJvbnRFbmRfTWVudG9yaW5nL21lbnRvcmluZ19tb2R1bGUxL3NyYy9zY3JpcHRzL3Jldmlld3MuanMiLCJ3ZWJwYWNrOi8vLy4uL0Q6L0xlYXJuaW5nL0Zyb250RW5kX01lbnRvcmluZy9tZW50b3JpbmdfbW9kdWxlMS9zcmMvc2NyaXB0cy9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4uL0Q6L0xlYXJuaW5nL0Zyb250RW5kX01lbnRvcmluZy9tZW50b3JpbmdfbW9kdWxlMS9zcmMvc2NyaXB0cy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL3Jldmlld3Muc2Nzcz8zYjkwIiwid2VicGFjazovLy8uL3N0eWxlcy9yZXZpZXdzLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vaW1hZ2VzL2RlZmF1bHQuanBnIl0sIm5hbWVzIjpbInNob3VsZExvYWQiLCJsb2FkaW5nIiwidXBCdXR0b24iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJsb2FkZXIiLCJyZW5kZXJSZXZpZXdJdGVtIiwicmV2aWV3IiwicmV2aWV3TGlua0luZm8iLCJsaW5rIiwibXVsdGltZWRpYSIsInJldmlld0l0ZW0iLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwic3JjIiwiZGlzcGxheV90aXRsZSIsImhlYWRsaW5lIiwidXJsIiwic3VnZ2VzdGVkX2xpbmtfdGV4dCIsInJlbmRlclJldmlld3MiLCJyZXZpZXdzIiwicmV2aWV3c0NvbnRhaW5lciIsImZvckVhY2giLCJhcHBlbmRDaGlsZCIsInNob3dMb2FkZXIiLCJzdHlsZSIsImRpc3BsYXkiLCJoaWRlTG9hZGVyIiwiZmV0Y2hBbGxSZXZpZXdzIiwib2Zmc2V0IiwidGhlbiIsImRhdGEiLCJoYXNfbW9yZSIsInJlc3VsdHMiLCJzaG93VXBCdXR0b24iLCJjbGFzc0xpc3QiLCJhZGQiLCJoaWRlVXBCdXR0b24iLCJyZW1vdmUiLCJhZGRFdmVudExpc3RlbmVyIiwid2luZG93Iiwic2Nyb2xsVG8iLCJzY3JvbGxZIiwiZG9jdW1lbnRFbGVtZW50Iiwic2Nyb2xsVG9wIiwiaW5uZXJIZWlnaHQiLCJib2R5Iiwib2Zmc2V0SGVpZ2h0IiwicmV2aWV3c0NvdW50IiwicXVlcnlTZWxlY3RvckFsbCIsImxlbmd0aCIsImZldGNoUmV2aWV3cyIsImZldGNoIiwiQVBJX0JBU0VfVVJMIiwiQVBJX0tFWSIsInJlc3BvbnNlIiwianNvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7Ozs7O0FBRUEsS0FBSUEsYUFBYSxJQUFqQjtBQUNBLEtBQUlDLFVBQVUsS0FBZDtBQUNBLEtBQU1DLFdBQVdDLFNBQVNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBakI7QUFDQSxLQUFNQyxTQUFTRixTQUFTQyxhQUFULENBQXVCLFNBQXZCLENBQWY7O0FBRUEsS0FBTUUsbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsTUFBRCxFQUFZO0FBQUEsU0FDbkJDLGNBRG1CLEdBQ1lELE1BRFosQ0FDekJFLElBRHlCO0FBQUEsU0FDSEMsVUFERyxHQUNZSCxNQURaLENBQ0hHLFVBREc7O0FBRWpDLFNBQU1DLGFBQWFSLFNBQVNTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbkI7QUFDQUQsZ0JBQVdFLFNBQVgsR0FBdUIsZUFBdkI7QUFDQUYsZ0JBQVdHLFNBQVgsNkJBQ2dCSixhQUFhQSxXQUFXSyxHQUF4QixvQkFEaEIsd0VBRzBDUixPQUFPUyxhQUhqRCwrREFJOENULE9BQU9VLFFBSnJELHFDQUttQlQsZUFBZVUsR0FMbEMsVUFLMENWLGVBQWVXLG1CQUx6RDtBQVFBLFlBQU9SLFVBQVA7QUFDSCxFQWJEOztBQWVBLEtBQU1TLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQ0MsT0FBRCxFQUFhO0FBQy9CLFNBQU1DLG1CQUFtQm5CLFNBQVNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBekI7QUFDQWlCLGFBQVFFLE9BQVIsQ0FBZ0I7QUFBQSxnQkFDWkQs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QixpQkFBaUIsR0FBRyxzQkFBc0IsMEJBQTBCLGlCQUFpQiwwQkFBMEIscUJBQXFCLG9CQUFvQix1QkFBdUIsR0FBRyw0QkFBNEIsK0JBQStCLEdBQUcsNkJBQTZCLG9CQUFvQixHQUFHLDBCQUEwQix5QkFBeUIscUJBQXFCLEdBQUcsY0FBYyx3QkFBd0IsaUJBQWlCLEdBQUc7O0FBRXYvQjs7Ozs7OztBQ1BBLHdEIiwiZmlsZSI6IjEuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmV0Y2hSZXZpZXdzIH0gZnJvbSAnLi9hcGknO1xyXG5cclxuaW1wb3J0ICcuLi9zdHlsZXMvcmV2aWV3cy5zY3NzJztcclxuaW1wb3J0IGRlZmF1bHRJbWFnZSBmcm9tICcuLi9pbWFnZXMvZGVmYXVsdC5qcGcnO1xyXG5cclxubGV0IHNob3VsZExvYWQgPSB0cnVlO1xyXG5sZXQgbG9hZGluZyA9IGZhbHNlO1xyXG5jb25zdCB1cEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51cC1idXR0b24nKTtcclxuY29uc3QgbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRlcicpO1xyXG5cclxuY29uc3QgcmVuZGVyUmV2aWV3SXRlbSA9IChyZXZpZXcpID0+IHtcclxuICAgIGNvbnN0IHsgbGluazogcmV2aWV3TGlua0luZm8sIG11bHRpbWVkaWEgfSA9IHJldmlldztcclxuICAgIGNvbnN0IHJldmlld0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHJldmlld0l0ZW0uY2xhc3NOYW1lID0gJ3Jldmlld3NfX2l0ZW0nO1xyXG4gICAgcmV2aWV3SXRlbS5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGltZyBzcmM9XCIke211bHRpbWVkaWEgPyBtdWx0aW1lZGlhLnNyYyA6IGRlZmF1bHRJbWFnZX1cIj5cclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJyZXZpZXdzX19pdGVtLXRpdGxlXCI+JHtyZXZpZXcuZGlzcGxheV90aXRsZX08L2gzPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmV2aWV3c19faXRlbS1oZWFkbGluZVwiPiR7cmV2aWV3LmhlYWRsaW5lfTwvZGl2PlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiJHtyZXZpZXdMaW5rSW5mby51cmx9XCI+JHtyZXZpZXdMaW5rSW5mby5zdWdnZXN0ZWRfbGlua190ZXh0fTwvYT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGA7XHJcbiAgICByZXR1cm4gcmV2aWV3SXRlbTtcclxufTtcclxuXHJcbmNvbnN0IHJlbmRlclJldmlld3MgPSAocmV2aWV3cykgPT4ge1xyXG4gICAgY29uc3QgcmV2aWV3c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXZpZXdzJyk7XHJcbiAgICByZXZpZXdzLmZvckVhY2gocmV2aWV3ID0+XHJcbiAgICAgICAgcmV2aWV3c0NvbnRhaW5lci5hcHBlbmRDaGlsZChyZW5kZXJSZXZpZXdJdGVtKHJldmlldykpXHJcbiAgICApO1xyXG59O1xyXG5cclxuY29uc3Qgc2hvd0xvYWRlciA9ICgpID0+IHtcclxuICAgIGxvYWRlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxufTtcclxuXHJcbmNvbnN0IGhpZGVMb2FkZXIgPSAoKSA9PiB7XHJcbiAgICBsb2FkZXIuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG59O1xyXG5cclxuY29uc3QgZmV0Y2hBbGxSZXZpZXdzID0gKG9mZnNldCkgPT4ge1xyXG4gICAgaWYgKCFzaG91bGRMb2FkIHx8IGxvYWRpbmcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsb2FkaW5nID0gdHJ1ZTtcclxuICAgIHNob3dMb2FkZXIoKTtcclxuICAgIGZldGNoUmV2aWV3cyhvZmZzZXQpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICBzaG91bGRMb2FkID0gZGF0YS5oYXNfbW9yZTtcclxuICAgICAgICBsb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgaGlkZUxvYWRlcigpO1xyXG4gICAgICAgIHJlbmRlclJldmlld3MoZGF0YS5yZXN1bHRzKTtcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgICBsb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgaGlkZUxvYWRlcigpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBzaG93VXBCdXR0b24gPSAoKSA9PiB7XHJcbiAgICB1cEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XHJcbn07XHJcblxyXG5jb25zdCBoaWRlVXBCdXR0b24gPSAoKSA9PiB7XHJcbiAgICB1cEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgICB1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbFkgPSB0aGlzLnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgICAgICBpZiAoc2Nyb2xsWSA+PSAxMDApIHtcclxuICAgICAgICAgICAgc2hvd1VwQnV0dG9uKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaGlkZVVwQnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlubmVySGVpZ2h0ICsgc2Nyb2xsWSA+PSBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCkge1xyXG4gICAgICAgICAgICBjb25zdCByZXZpZXdzQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmV2aWV3c19faXRlbScpLmxlbmd0aDtcclxuICAgICAgICAgICAgZmV0Y2hBbGxSZXZpZXdzKHJldmlld3NDb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZmV0Y2hBbGxSZXZpZXdzKCk7XHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9EOi9MZWFybmluZy9Gcm9udEVuZF9NZW50b3JpbmcvbWVudG9yaW5nX21vZHVsZTEvc3JjL3NjcmlwdHMvcmV2aWV3cy5qcyIsImltcG9ydCBjb25zdGFudHMgZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGZldGNoUmV2aWV3cyA9IChvZmZzZXQgPSAwKSA9PlxyXG4gICAgZmV0Y2goYCR7Y29uc3RhbnRzLkFQSV9CQVNFX1VSTH0vbW92aWVzL3YyL3Jldmlld3MvYWxsLmpzb24/YXBpLWtleT0ke2NvbnN0YW50cy5BUElfS0VZfSZvZmZzZXQ9JHtvZmZzZXR9YClcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vRDovTGVhcm5pbmcvRnJvbnRFbmRfTWVudG9yaW5nL21lbnRvcmluZ19tb2R1bGUxL3NyYy9zY3JpcHRzL2FwaS5qcyIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIEFQSV9CQVNFX1VSTDogJ2h0dHBzOi8vYXBpLm55dGltZXMuY29tL3N2YycsXHJcbiAgICBBUElfS0VZOiAnZmFiZTVmYWJmYzViNDRlYThlODI5YjFjNjQwNmVhYzInXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9EOi9MZWFybmluZy9Gcm9udEVuZF9NZW50b3JpbmcvbWVudG9yaW5nX21vZHVsZTEvc3JjL3NjcmlwdHMvY29uc3RhbnRzLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS4vcmV2aWV3cy5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhLi9yZXZpZXdzLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS4vcmV2aWV3cy5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3N0eWxlcy9yZXZpZXdzLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnJldmlld3Mge1xcbiAgbWF4LXdpZHRoOiA5NDBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbn1cXG5cXG4ucmV2aWV3c19faXRlbSB7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XFxuICAucmV2aWV3c19faXRlbSB7XFxuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG59XFxuXFxuLnJldmlld3NfX2l0ZW06bGFzdC1jaGlsZCB7XFxuICBib3JkZXItYm90dG9tOiBub25lO1xcbn1cXG5cXG4ucmV2aWV3c19faXRlbSBpbWcge1xcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbiAgaGVpZ2h0OiAxNDBweDtcXG4gIHdpZHRoOiAyMTBweDtcXG59XFxuXFxuLnJldmlld3NfX2l0ZW0gYSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjb2xvcjogYmxhY2s7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5cXG4ucmV2aWV3c19faXRlbSBhOmhvdmVyIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4ucmV2aWV3c19faXRlbS1oZWFkbGluZSB7XFxuICBmb250LXNpemU6IDE2cHg7XFxufVxcblxcbi5yZXZpZXdzX19pdGVtID4gZGl2IHtcXG4gIC1tcy1mbGV4LXBvc2l0aXZlOiAxO1xcbiAgICAgIGZsZXgtZ3JvdzogMTtcXG59XFxuXFxuLnZpc2libGUge1xcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9jc3MtbG9hZGVyIS4uL34vcG9zdGNzcy1sb2FkZXIhLi4vfi9yZXNvbHZlLXVybC1sb2FkZXIhLi4vfi9zYXNzLWxvYWRlciEuL3N0eWxlcy9yZXZpZXdzLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImRlZmF1bHQuanBnXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9pbWFnZXMvZGVmYXVsdC5qcGdcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=