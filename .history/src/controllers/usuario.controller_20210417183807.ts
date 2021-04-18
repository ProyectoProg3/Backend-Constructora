import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Keys as llaves} from '../config/keys';
import {Usuario} from '../models';
import {Credenciales} from '../models/credenciales.model';
import {RestablecerContrasena} from '../models/restablecer-contrasena.model';
import {UsuarioRepository} from '../repositories';
import {FuncionesGeneralesService} from '../services';
import {NotificacionesService} from '../services/notificaciones.service';
import {SesionService} from '../services/sesion.service';


export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(FuncionesGeneralesService)
    public servicioFunciones: FuncionesGeneralesService,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @service(SesionService)
    public servicioSesion: SesionService
  ) { }

  @authenticate('admin')
  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id', 'contrasena'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    let contrasenaAleatoria = this.servicioFunciones.GenerarConstrasenaAleatoria();
    console.log(contrasenaAleatoria);

    let contrasenaCifrada = this.servicioFunciones.CifrarTexto(contrasenaAleatoria);
    console.log(contrasenaCifrada);

    usuario.contrasena = contrasenaCifrada;
    let usuarioCreado = await this.usuarioRepository.create(usuario);
    if (usuarioCreado) {
      //Notificación via email
      let contenido = `Hola! <br /> Se ha creado para usted un usuario en la plataforma de la Constructora UdeC S.A.S
        sus credenciales de acceso son: <br />
        <ul>
          <li>Usuario: ${usuarioCreado.nombre_usuario}</li>
          <li>Contraseña: ${contrasenaAleatoria}</li>
        </ul>`;
      this.servicioNotificaciones.EnviarCorreoElectronico(usuarioCreado.correo, llaves.asuntoNuevoUsuario, contenido);
    }
    return usuarioCreado;
  }

  @post('/reset-password')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(RestablecerContrasena)}},
  })
  async resetPassword(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestablecerContrasena),
        },
      },
    })
    restablecerContrasena: RestablecerContrasena,
  ): Promise<Object> {

    let usuario = await this.usuarioRepository.findOne({where:{nombre_usuario: correo.correo}})
    let contrasenaAleatoria = this.servicioFunciones.GenerarConstrasenaAleatoria();
    console.log(contrasenaAleatoria);

    let contrasenaCifrada = this.servicioFunciones.CifrarTexto(contrasenaAleatoria);
    console.log(contrasenaCifrada);

    usuario.contrasena = contrasenaCifrada;
    let usuarioCreado = await this.usuarioRepository.create(usuario);
    if (usuarioCreado) {
      //Notificación via email
      let contenido = `Hola! <br /> Se ha creado para usted un usuario en la plataforma de la Constructora UdeC S.A.S
        sus credenciales de acceso son: <br />
        <ul>
          <li>Usuario: ${usuarioCreado.nombre_usuario}</li>
          <li>Contraseña: ${contrasenaAleatoria}</li>
        </ul>`;
      this.servicioNotificaciones.EnviarCorreoElectronico(usuarioCreado.correo, llaves.asuntoNuevoUsuario, contenido);
    }
    return usuarioCreado;
  }

  @post('/identificar-usuario')
  async validar(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: getModelSchemaRef(Credenciales)
          }
        }
      }
    )
    credenciales: Credenciales
  ): Promise<object> {
    let usuario = await this.usuarioRepository.findOne({where: {nombre_usuario: credenciales.nombre_usuario, contrasena: credenciales.contrasena}});
    if (usuario) {
      //Generar un Token
      let token = this.servicioSesion.GenerarToken(usuario);
      return {
        user: {
          username: usuario.nombre_usuario,
          role: usuario.rolId
        },
        tk: token
      };
    } else {
      //Lanzar error
      throw new HttpErrors[401]("Las credenciales no son validas.");
    }

  }


  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}
