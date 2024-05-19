<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/todo', name: 'api_todo')]
class TodoController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private TodoRepository $todoRepository;

    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    #[Route('/read', name: 'api_todo_read', methods: ['GET'])]
    public function read(): JsonResponse
    {
        $todos = $this->todoRepository->findAll();

        $arrayOfTodos = [];
        foreach ($todos as $todo) {
            $arrayOfTodos[] = $todo->toArray();
        }

        return $this->json($arrayOfTodos);
    }

    #[Route('/create', name: 'api_todo_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent());

        $todo = new Todo();
        $todo->setName($content->name);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();

            return $this->json([
                'todo' => $todo->toArray(),
                'message' => ['text' => 'Task created successfully', 'level' => 'success'],
            ]);
        } catch (Exception $exception) {
            return $this->json([
                'message' => ['text' => 'Error while trying to submit task to the database', 'level' => 'error'],
            ]);
        }
    }

    #[Route('/update', name: 'api_todo_update', methods: ['PUT'])]
    public function update(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent());

        $todo = $this->todoRepository->findOneBy(['id' => $content->id]);
        $todo->setName($content->name);

        try {
            $this->entityManager->flush();

            return $this->json([
                'todo' => $todo->toArray(),
                'message' => ['text' => 'Task updated successfully', 'level' => 'success'],
            ]);
        } catch (Exception $exception) {
            return $this->json([
                'message' => ['text' => 'Error while trying to update task in the database', 'level' => 'error'],
            ]);
        }
    }

    #[Route('/delete', name: 'api_todo_delete', methods: ['DELETE'])]
    public function delete(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent());

        $todo = $this->todoRepository->findOneBy(['id' => $content->id]);

        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();

            return $this->json([
                'message' => ['text' => 'Task deleted successfully', 'level' => 'success'],
            ]);
        } catch (Exception $exception) {
            return $this->json([
                'message' => ['text' => 'Error while trying to delete task in the database', 'level' => 'error'],
            ]);
        }
    }
}
