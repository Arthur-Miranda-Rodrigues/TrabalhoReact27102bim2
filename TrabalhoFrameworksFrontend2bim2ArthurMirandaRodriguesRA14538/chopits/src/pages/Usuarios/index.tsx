import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { validaPermissao, verificaTokenExpirado } from "../../service/token";
import type { IToken } from "../../interfaces/token";

interface IUsuario {
    id: number;
    nome: string;
    email: string;
}

export const Usuarios = () => {

    const navigate = useNavigate();

    const [token, setToken] = useState<IToken>()
    const [usuarios, setUsuarios] = useState<IUsuario[]>([])

    useEffect(() => {

        let lsToken = localStorage.getItem('chopts:usuarioLogado')

        //any é gambiarra não use
        let token: IToken | null = null

        if (typeof lsToken === 'string') {
            token = JSON.parse(lsToken)
            setToken(token!)
        }

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate('/')
        }

        // Requisição no backend
        axios.get('http://localhost:3001/users')
            .then((resposta) => {
                setUsuarios(resposta.data)
            })
            .catch((erro) => {
                console.log(erro)
            })

    }, [])

    const excluirUsuario = useCallback(async (id: number) => {
        try {
            await axios.delete(`http://localhost:3001/users/${id}`)

            const { data } = await axios.get('http://localhost:3001/users')

            setUsuarios(data)

        } catch (erro) {
            console.log(erro)
        }

    }, [])

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 15
                }}
            >
                <h2>Usuários</h2>

                {
                    validaPermissao(token?.user.permissoes, ['admin']) && (
                        <button
                            className="btn btn-success"
                            type="button"
                            onClick={() => {
                                navigate('/usuarios/criar')
                            }}
                        >
                            Add
                        </button>
                    )
                }

            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        usuarios.map((usuario, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{usuario.id}</th>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            style={{
                                                marginRight: 5
                                            }}
                                            onClick={() => {
                                                navigate(`/usuarios/${usuario.id}`)
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={() => {
                                                excluirUsuario(usuario.id)
                                            }}
                                        >Excluir</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}