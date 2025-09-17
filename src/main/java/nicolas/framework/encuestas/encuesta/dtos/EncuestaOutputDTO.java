package nicolas.framework.encuestas.encuesta.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor // incluye grupoDelCliente
public class EncuestaOutputDTO {
    private Long id;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private LocalDate fechaPCompletarInicio;
    private LocalDate fechaPCompletarFin;
    private String descripcion;
    private List<PreguntaOutputDTO> preguntas;
    private List<GrupoOutputDTO> grupos;
    private GrupoOutputDTO grupoDelCliente;


    public EncuestaOutputDTO(Long id, LocalDate fechaInicio,
                             LocalDate fechaFin,
                             LocalDate fechaPCompletarInicio,
                             LocalDate fechaPCompletarFin,
                             String descripcion,
                             List<PreguntaOutputDTO> preguntas,
                             List<GrupoOutputDTO> grupos) {
        this.id = id;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.fechaPCompletarInicio = fechaPCompletarInicio;
        this.fechaPCompletarFin = fechaPCompletarFin;
        this.descripcion = descripcion;
        this.preguntas = preguntas;
        this.grupos = grupos;
        this.grupoDelCliente = null;
    }
}
