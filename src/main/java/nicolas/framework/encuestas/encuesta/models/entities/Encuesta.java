package nicolas.framework.encuestas.encuesta.models.entities;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Encuesta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private LocalDate fechaInicio;

    @Column
    private LocalDate fechaFin;

    @Column
    private LocalDate fechaPCompletarInicio;

    @Column
    private LocalDate fechaPCompletarFin;

    @Column(nullable = true)
    private String descripcion;

    @ManyToMany
    @JoinTable(
            name = "encuesta_x_pregunta",
            joinColumns = @JoinColumn(name = "encuesta_id"),
            inverseJoinColumns = @JoinColumn(name = "pregunta_id")
    )
    private List<Pregunta> preguntas = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
            name = "grupo_x_encuesta",
            joinColumns = @JoinColumn(name = "encuesta_id"),
            inverseJoinColumns = @JoinColumn(name = "grupo_id")
    )
    private List<Grupo> grupos = new ArrayList<>();


    public Encuesta(String desc, List<Pregunta> preguntas, List<Grupo> grupos) {
        this.descripcion = desc;
        this.preguntas = preguntas;
        this.grupos = grupos;
    }


    public Encuesta(LocalDate fechaInicio, LocalDate fechaFin, LocalDate fechaPCompletarInicio, LocalDate fechaPCompletarFin, @Nullable String descripcion, List<Pregunta> preguntas, List<Grupo> grupos) {
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.fechaPCompletarInicio = fechaPCompletarInicio;
        this.fechaPCompletarFin = fechaPCompletarFin;
        this.descripcion = descripcion;
        this.preguntas = preguntas;
        this.grupos = grupos;
    }
}