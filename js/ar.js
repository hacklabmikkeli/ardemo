window.ARThreeOnLoad = function() {
	ARController.getUserMediaThreeScene({
		maxARVideoSize: 320,
		cameraParam: "data/camera_para.dat",
		onSuccess: function(arScene, arController, arCamera) {
			document.body.className = arController.orientation;
			arController.setPatternDetectionMode(artoolkit.AR_MATRIX_CODE_DETECTION);
			var renderer = new THREE.WebGLRenderer({antialias: true});

			if (arController.orientation === "portrait") {
				var w = (window.innerWidth / arController.videoHeight) * arController.videoWidth;
				var h = window.innerWidth;
				renderer.setSize(w, h);
				renderer.domElement.style.paddingBottom = (w-h) + "px";
			} else {
				if (/Android|mobile|iPad|iPhone/i.test(navigator.userAgent)) {
					renderer.setSize(window.innerWidth, (window.innerWidth / arController.videoWidth) * arController.videoHeight);
				} else {
					renderer.setSize(arController.videoWidth, arController.videoHeight);
					document.body.className += " desktop";
				}
			}

			document.body.insertBefore(renderer.domElement, document.body.firstChild);
			var markerRoot = arController.createThreeBarcodeMarker(20);

			var loader = new THREE.ObjectLoader();
			loader.load("3d/tree.json", function(obj) {
			    markerRoot.add(obj);
			});

			/*var loader = new THREE.JSONLoader();
			loader.load( '3d/model.json', function ( geometry, materials ) {
			    var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
			    markerRoot.add( mesh );
			});*/

			/*var ground = new THREE.Mesh(
				new THREE.PlaneGeometry(2, 2, 1),
				new THREE.MeshBasicMaterial({
					color: 0x008000
				})
			);
			markerRoot.add(ground);

			var trees = [];

			for (var i = 0; i < 10; i++) {
				trees[i] = {};
				var x = Math.random() * 1.8 - 0.9;
				var y = Math.random() * 1.8 - 0.9;

				trees[i].log = new THREE.Mesh(
					new THREE.BoxGeometry(0.1, 0.1, 0.5),
					new THREE.MeshBasicMaterial({
						color: 0x663300
					})
				);
				trees[i].log.position.x = x;
				trees[i].log.position.y = y;
				trees[i].log.position.z = 0.25;
				markerRoot.add(trees[i].log);

				trees[i].leaves = new THREE.Mesh(
					new THREE.BoxGeometry(0.3, 0.3, 0.3),
					new THREE.MeshBasicMaterial({
						color: 0x00FF00
					})
				);
				trees[i].leaves.position.x = x;
				trees[i].leaves.position.y = y;
				trees[i].leaves.position.z = 0.65;
				markerRoot.add(trees[i].leaves);
			}*/

			arScene.scene.add(markerRoot);

			var tick = function() {
				arScene.process();
				arScene.renderOn(renderer);
				requestAnimationFrame(tick);
			};
			tick();
		}
	});
	delete window.ARThreeOnLoad;
};
if (window.ARController && ARController.getUserMediaThreeScene) {
	ARThreeOnLoad();
}
