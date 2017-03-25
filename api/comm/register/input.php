<?php

if (isset($_FILES['file'])) {
	echo 'param=' . $_POST['useDateMonth'] . ',ok';
} else {
	echo 'ERROR';
}

?>