import express, { Router, Request, Response } from 'express'

import { CreateUsuarioController } from './controllers/usuario/CreateUsuarioController';
import { AuthUserController } from './controllers/usuario/AuthUserController'
import { DetailUserController } from './controllers/usuario/DetailUserController'
import { UpdateUserController } from './controllers/usuario/UpdateUserController'

import { CreateResponsavelController } from './controllers/responsavel/CreateResponsavelController'
import { DetailResponsavelController } from './controllers/responsavel/DetailResponsavelController'
import { UpdateResponsavelController } from './controllers/responsavel/UpdateResponsavelController'
import { CountResponsavelController } from './controllers/responsavel/CountResponsavelController'

import { CreatePetController } from './controllers/pet/CreatePetController'
import { ListPetController } from './controllers/pet/ListPetController'
import { UpdatePetController } from './controllers/pet/UpdatePetController'
import { DetailPetController } from './controllers/pet/DetailPetController'
import { CountPetController } from './controllers/pet/CountPetController'
import { SearchPetByPhoneController } from './controllers/pet/SearchPetByPhoneController'

import { CreateVeterinarioController } from './controllers/veterinario/CreateVeterinarioController'
import { ListVeterinarioController } from './controllers/veterinario/ListVeterinarioController'
import { UpdateVeterinarioController } from './controllers/veterinario/UpdateVeterinarioController'
import { CountVeterinariosController } from './controllers/veterinario/CountVeterinariosController'
import { DetailVeterinarioController } from './controllers/veterinario/DetailVeterinarioController'


import { CreateServicoController } from './controllers/servico/CreateServicoController'
import { ListServicoController } from './controllers/servico/ListServicoController'
import { UpdateServicoController } from './controllers/servico/UpdateServicoController'
import { CheckSubscriptionController } from './controllers/servico/CheckSubscriptionController'
import { CountServicosController } from './controllers/servico/CountServicosController'
import { DetailServicoController } from './controllers/servico/DetailServicoController'

import { CreateConsultaController } from './controllers/consulta/CreateConsultaController'
import { ListConsultaController } from './controllers/consulta/ListConsultaController'
import { FinishConsultaController } from './controllers/consulta/FinishConsultaController'

import { SubscribeControllerPremiun } from './controllers/assinatura/SubscribeControllerPremiun'
import { SubscribeControllerBasic } from './controllers/assinatura/SubscribeControllerBasic'
import { WebhooksController } from './controllers/assinatura/WebhooksController'
import { CreatePortalController } from './controllers/assinatura/CreatePortalController'

import { isAuthenticated } from './middlewares/isAuthenticated'
import { addUsuarioIdToQuery } from './middlewares/addUsuarioIdToQuery'


const router = Router();

//ROTAS USUARIO
router.post('/usuarios', new CreateUsuarioController().handle)
router.post('/sessao', new AuthUserController().handle)
router.get('/me',isAuthenticated, new DetailUserController().handle)
router.put('/usuarios', isAuthenticated, new UpdateUserController().handle)

//ROTAS RESPONSAVEL
router.post('/responsavel', isAuthenticated, new CreateResponsavelController().handle)
router.get('/responsavel/detail', isAuthenticated, new DetailResponsavelController().handle)
router.put('/responsavel', isAuthenticated, new UpdateResponsavelController().handle)
router.get('/responsavel/count', isAuthenticated, new CountResponsavelController().handle)

//ROTAS PET
router.post('/pet', isAuthenticated, new CreatePetController().handle)
router.get('/pets', isAuthenticated, new ListPetController().handle)
router.put('/pet', isAuthenticated, new UpdatePetController().handle)
router.get('/pets/search', addUsuarioIdToQuery, new SearchPetByPhoneController().handle)
router.get('/pet/detail', isAuthenticated, new DetailPetController().handle)
router.get('/pet/count', isAuthenticated, new CountPetController().handle)


//ROTAS VETERINARIO
router.post('/veterinario', isAuthenticated, new CreateVeterinarioController().handle)
router.get('/veterinarios', isAuthenticated, new ListVeterinarioController().handle)
router.put('/veterinario', isAuthenticated, new UpdateVeterinarioController().handle)
router.get('/veterinario/count', isAuthenticated, new CountVeterinariosController().handle)
router.get('/veterinario/detail', isAuthenticated, new DetailVeterinarioController().handle)

//ROTAS SERVICO
router.post('/servico', isAuthenticated, new CreateServicoController().handle)
router.get('/servicos', isAuthenticated, new ListServicoController().handle)
router.put('/servico', isAuthenticated, new UpdateServicoController().handle)
router.get('/servico/check', isAuthenticated,addUsuarioIdToQuery, new CheckSubscriptionController().handle)
router.get('/servico/count', isAuthenticated, new CountServicosController().handle)
router.get('/servico/detail', isAuthenticated, new DetailServicoController().handle)

//ROTAS CONSULTA
router.post('/consulta', isAuthenticated, new CreateConsultaController().handle)
router.get('/consultas', isAuthenticated, new ListConsultaController().handle)
router.delete('/consulta/delete', isAuthenticated, new FinishConsultaController().handle)

// --- ROTAS PAGAMENTOS ---
router.post('/assinatura/premiun', isAuthenticated, new SubscribeControllerPremiun().handle)
router.post('/assinatura/basic', isAuthenticated, new SubscribeControllerBasic().handle)
router.post('/webhooks', express.raw({ type: 'application/json'}), new WebhooksController().handle)
router.post('/create-portal', isAuthenticated, new CreatePortalController().handle)

export { router };