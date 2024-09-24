<?php 
                        // Datos de conexión a la base de datos
                            $host = "localhost";
                            $user = "root";
                            $password = "";
                            $database = "coments";

                            // Crear la conexión
                            $conn = new mysqli($host, $user, $password, $database);

                            // Verificar la conexión
                            if ($conn->connect_error) {
                                die("Error de conexión: " . $conn->connect_error);
                            }

                            // Obtener y mostrar comentarios de la base de datos
                            $sql = "SELECT name, comment FROM comentarios ORDER BY created_at DESC";
                            $result = $conn->query($sql);

                            if ($result->num_rows > 0) {
                                while ($row = $result->fetch_assoc()) {
                                    echo '<div class="comment"><strong>' . htmlspecialchars($row['name']) . ':</strong> ' . htmlspecialchars($row['comment']) . '</div>';
                                }
                            } else {
                                echo '<div class="comment">No hay comentarios aún.</div>';
                            }

                            // Cierra la conexión
                            $conn->close();
                            ?>